import type { CollectionEntry } from 'astro:content';

interface RelatedPost {
  post: CollectionEntry<'blog'>;
  score: number;
}

/**
 * Find related posts based on shared tags
 * @param currentPost - The current blog post
 * @param allPosts - All available blog posts
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related posts, sorted by relevance
 */
export function getRelatedPosts(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  limit: number = 3
): CollectionEntry<'blog'>[] {
  const currentTags = currentPost.data.tags || [];

  // If current post has no tags, return empty array
  if (currentTags.length === 0) {
    return [];
  }

  // Score each post by number of shared tags
  const scoredPosts: RelatedPost[] = allPosts
    .filter(post => {
      // Exclude current post
      if (post.id === currentPost.id) return false;

      // Exclude unpublished posts
      if (post.data.published === false) return false;

      // Only include posts with tags
      return post.data.tags && post.data.tags.length > 0;
    })
    .map(post => {
      const postTags = post.data.tags || [];
      const sharedTags = currentTags.filter(tag => postTags.includes(tag));

      return {
        post,
        score: sharedTags.length
      };
    })
    .filter(item => item.score > 0); // Only include posts with at least 1 shared tag

  // Sort by score (descending), then by date (newest first)
  scoredPosts.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return b.post.data.date.getTime() - a.post.data.date.getTime();
  });

  // Return top N posts
  return scoredPosts.slice(0, limit).map(item => item.post);
}
