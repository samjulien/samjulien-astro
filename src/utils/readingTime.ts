/**
 * Calculate estimated reading time for content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): string {
  if (!content || typeof content !== 'string') {
    return '1 min read';
  }

  // Strip markdown/MDX formatting for accurate word count
  const cleanText = content
    // Remove frontmatter
    .replace(/^---[\s\S]*?---/m, '')
    // Remove import/export statements (for MDX)
    .replace(/^(import|export)\s+.*$/gm, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, ' ')
    // Remove inline code
    .replace(/`[^`]*`/g, ' ')
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    // Keep link text, remove URL
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove JSX/HTML tags
    .replace(/<[^>]*>/g, ' ')
    // Remove HTML entities
    .replace(/&[a-z]+;/gi, ' ')
    // Remove markdown formatting chars
    .replace(/[#*_~\-]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleanText.split(' ').filter(word => word.length > 0);
  const wordCount = words.length;

  if (wordCount === 0) {
    return '1 min read';
  }

  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
}

/**
 * Get reading time from a post's body content
 * In Astro 5 Content Collections with glob loader, post.body contains the raw markdown
 * @param post - The post object from Astro content collection
 * @returns Formatted reading time string
 */
export function getReadingTime(post: { body?: string }): string {
  return calculateReadingTime(post.body || '');
}

/**
 * Alias for getReadingTime for backward compatibility
 */
export function getReadingTimeFromBody(post: { body?: string }): string {
  return getReadingTime(post);
}
