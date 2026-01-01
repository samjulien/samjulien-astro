import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');

  // Filter for published posts and sort by date (newest first)
  const publishedPosts = blog
    .filter(post => post.data.published !== false)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "Sam Julien's writing",
    description: "Articles on developer relations, AI engineering, web development, and career growth by Sam Julien",
    site: context.site || 'https://www.samjulien.com',
    items: publishedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description || post.data.excerpt || '',
      pubDate: post.data.date,
      link: `/${post.id}/`,
      categories: post.data.tags || [],
    })),
    customData: '<language>en-us</language>',
  });
}
