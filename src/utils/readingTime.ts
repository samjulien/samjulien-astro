/**
 * Calculate estimated reading time for content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): string {
  // Strip HTML/MDX tags and count words
  const cleanText = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[_*~`#]/g, '') // Remove markdown formatting
    .trim();

  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return minutes === 1 ? '1 min read' : `${minutes} min read`;
}

/**
 * Get reading time from rendered content
 * @param renderResult - The result from await render(post)
 * @returns Formatted reading time string
 */
export function getReadingTime(renderResult: { compiledContent: () => string }): string {
  const content = renderResult.compiledContent();
  return calculateReadingTime(content);
}

/**
 * Get reading time from raw post body
 * @param post - The post object with body property
 * @returns Formatted reading time string
 */
export function getReadingTimeFromBody(post: { body: string }): string {
  return calculateReadingTime(post.body);
}
