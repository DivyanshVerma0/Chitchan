import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';

const Sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get all communities
    const communitiesSnapshot = await getDocs(collection(firestore, 'communities'));
    const communities = communitiesSnapshot.docs.map(doc => doc.id);

    // Get all posts
    const postsSnapshot = await getDocs(collection(firestore, 'posts'));
    const posts = postsSnapshot.docs.map(doc => doc.id);

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://chitchan.com</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${communities.map(community => `
  <url>
    <loc>https://chitchan.com/c/${community}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${posts.map(post => `
  <url>
    <loc>https://chitchan.com/post/${post}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

    // Set the appropriate headers
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
};

export default Sitemap; 