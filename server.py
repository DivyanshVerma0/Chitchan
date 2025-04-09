from flask import Flask, request, render_template, g, redirect, url_for
from werkzeug.utils import secure_filename
import sqlite3
import datetime
import os
import random

DATABASE = 'chitchan.db'
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__, static_url_path='/static')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def dict_factory(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

def get_db():
    if not hasattr(g, 'db'):
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = dict_factory
    return g.db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, 'db', None)
    if db:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def create_new_post(values, reply_id):
    db = get_db()
    if reply_id == 0:
        query = '''INSERT INTO posts(image_file, user, date, board, post_text) VALUES (?, ?, ?, ?, ?)'''
    else:
        query = '''INSERT INTO replies(image_file, user, date, board, post_text, replying_to) VALUES (?, ?, ?, ?, ?, ?)'''
    cur = db.cursor()
    cur.execute(query, values)
    db.commit()
    return cur.lastrowid

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    boards = query_db('SELECT * FROM boards')
    popular_threads = query_db('SELECT * FROM posts ORDER BY post_id DESC LIMIT 4')
    return render_template('front.html', boards=boards, popular_threads=popular_threads)

@app.route('/<board>')
def board_view(board):
    posts = query_db('SELECT * FROM posts WHERE board = ?', [board])
    board_info = query_db('SELECT board_description FROM boards WHERE board_short_name = ?', [board], one=True)
    board_desc = board_info['board_description'] if board_info else ''
    return render_template('board.html', posts=posts, board=board, board_desc=board_desc)

@app.route('/<board>/post', methods=['POST'])
def post(board):
    newfilename = ''
    user = request.form.get('name', '').strip()
    post_text = request.form.get('post_text', '').strip()

    if post_text:
        if 'image' in request.files:
            file = request.files['image']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                ext = filename.rsplit('.', 1)[1].lower()
                newfilename = f"{random.randint(10000000, 99999999)}.{ext}"
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], newfilename))

        now = datetime.datetime.now().isoformat()
        post_data = (newfilename, user, now, board, post_text)
        create_new_post(post_data, reply_id=0)

    return redirect(url_for('board_view', board=board))

@app.route('/<board>/post_reply/<post_id>', methods=['POST'])
def post_reply(board, post_id):
    newfilename = ''
    user = request.form.get('name', '').strip()
    post_text = request.form.get('post_text', '').strip()

    if post_text:
        if 'image' in request.files:
            file = request.files['image']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                ext = filename.rsplit('.', 1)[1].lower()
                newfilename = f"{random.randint(10000000, 99999999)}.{ext}"
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], newfilename))

        now = datetime.datetime.now().isoformat()
        reply_data = (newfilename, user, now, board, post_text, int(post_id))
        create_new_post(reply_data, reply_id=int(post_id))

    return redirect(url_for('reply', board=board, post_id=post_id))

@app.route('/<board>/reply/<post_id>')
def reply(board, post_id):
    post = query_db('SELECT * FROM posts WHERE post_id = ?', [post_id], one=True)
    replies = query_db('SELECT * FROM replies WHERE replying_to = ?', [post_id])
    return render_template('reply.html', post=post, replies=replies, board=board)

if __name__ == '__main__':
    app.run(debug=True, port=3000)
