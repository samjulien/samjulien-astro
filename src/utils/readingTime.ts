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

  // Strip HTML/MDX tags and markdown formatting
  const cleanText = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ') // Remove script tags
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')   // Remove style tags
    .replace(/<[^>]*>/g, ' ')           // Remove HTML tags
    .replace(/```[\s\S]*?```/g, ' ')    // Remove code blocks
    .replace(/`[^`]*`/g, ' ')           // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, ' ')   // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Keep link text, remove URL
    .replace(/[#*_~\-]/g, '')           // Remove markdown formatting chars
    .replace(/\s+/g, ' ')               // Normalize whitespace
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
 * Get reading time from rendered content
 * @param renderResult - The result from await render(post)
 * @returns Formatted reading time string
 */
export function getReadingTime(renderResult: any): string {
  console.log('=== DEBUG getReadingTime ===');
  console.log('renderResult type:', typeof renderResult);
  console.log('renderResult keys:', Object.keys(renderResult || {}));
  console.log('compiledContent type:', typeof renderResult?.compiledContent);
  console.log('html type:', typeof renderResult?.html);

  let content = '';

  // Handle different Astro API versions and render result shapes
  if (typeof renderResult?.compiledContent === 'function') {
    // Newer Astro versions have compiledContent as a function
    console.log('Using compiledContent()');
    content = String(renderResult.compiledContent());
  } else if (typeof renderResult?.compiledContent === 'string') {
    // Older versions may have it as a string
    console.log('Using compiledContent string');
    content = renderResult.compiledContent;
  } else if (renderResult?.html) {
    // Fallback to html property if available
    console.log('Using html property');
    content = String(renderResult.html);
  } else if (typeof renderResult === 'string') {
    // Direct string content
    console.log('Using renderResult as string');
    content = renderResult;
  } else {
    // Last resort: try to stringify
    console.log('Stringifying renderResult');
    content = String(renderResult || '');
  }

  console.log('Content length:', content.length);
  console.log('Content sample:', content.substring(0, 200));
  console.log('=== END DEBUG ===');

  return calculateReadingTime(content);
}

/**
 * Get reading time from raw post body
 * @param post - The post object from Astro content collection
 * @returns Formatted reading time string
 */
export function getReadingTimeFromBody(post: any): string {
  console.log('=== DEBUG getReadingTimeFromBody ===');
  console.log('post type:', typeof post);
  console.log('post keys:', Object.keys(post || {}));
  console.log('post.body length:', post.body?.length || 0);
  console.log('post.rawContent length:', post.rawContent?.length || 0);
  console.log('post.content length:', post.content?.length || 0);
  console.log('post.data.description:', post.data?.description?.substring(0, 100));

  // Try to get content from various possible properties
  const content = post.body || post.rawContent || post.content || '';

  console.log('Selected content length:', content.length);
  console.log('Selected content sample:', content.substring(0, 200));
  console.log('=== END DEBUG ===');

  if (!content && post.data?.description) {
    // Fallback - estimate based on description if body is not available
    return calculateReadingTime(post.data.description);
  }

  return calculateReadingTime(content);
}
