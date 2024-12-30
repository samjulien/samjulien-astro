import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/data/blog');

// Function to clean date format
const cleanDate = (dateStr) => {
  if (!dateStr) return undefined;
  
  // Extract just the date part (YYYY-MM-DD)
  const match = dateStr.toString().trim().match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : dateStr;
};

// Function to process a single file
async function processFile(filePath) {
  try {
    // Read the file
    const content = await fs.readFile(filePath, 'utf8');
    
    // First, find the frontmatter section
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return;

    let frontmatter = frontmatterMatch[1];
    
    // Only update the date and date_updated fields
    // Updated regex to handle multiple spaces
    frontmatter = frontmatter.replace(
      /(date:\s+['"]?).*?(['"]?$)/gm,
      (match, prefix) => `date: ${cleanDate(match.replace(/(date:\s+['"]?|['"]?$)/g, ''))}`
    );
    
    frontmatter = frontmatter.replace(
      /(date_updated:\s+['"]?).*?(['"]?$)/gm,
      (match, prefix) => `date_updated: ${cleanDate(match.replace(/(date_updated:\s+['"]?|['"]?$)/g, ''))}`
    );

    // Reconstruct the file
    const newContent = `---\n${frontmatter}\n---${content.slice(frontmatterMatch[0].length)}`;
    
    // Write back to file
    await fs.writeFile(filePath, newContent);
    console.log(`✓ Updated ${path.basename(filePath)}`);
  } catch (err) {
    console.error(`✗ Error processing ${filePath}:`, err);
  }
}

// Function to recursively find all .md and .mdx files
async function findMdFiles(dir) {
  const files = await fs.readdir(dir);
  const mdFiles = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      mdFiles.push(...(await findMdFiles(filePath)));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      mdFiles.push(filePath);
    }
  }

  return mdFiles;
}

// Main function
async function main() {
  try {
    console.log('Starting date format update...');
    
    const files = await findMdFiles(BLOG_DIR);
    console.log(`Found ${files.length} markdown files`);
    
    for (const file of files) {
      await processFile(file);
    }
    
    console.log('Finished updating date formats!');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();