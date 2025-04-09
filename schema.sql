
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS boards;
DROP TABLE IF EXISTS replies;


CREATE TABLE posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_file TEXT,
    user TEXT,
    date TEXT,
    board TEXT NOT NULL,
    post_text TEXT
);

CREATE TABLE boards (
    board_id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_name TEXT NOT NULL,
    full_name TEXT NOT NULL
);

CREATE TABLE replies (
    reply_id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_file TEXT,
    user TEXT,
    date TEXT,
    board TEXT NOT NULL,
    post_text TEXT,
    replying_to INTEGER NOT NULL
);
