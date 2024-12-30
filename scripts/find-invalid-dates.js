import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/data/blog');

// Function to check if a date string is valid
const isValidDate = (dateStr) => {
  if (!dateStr) return false;
  const parsed = new Date(dateStr);
  return parsed instanceof Date && !isNaN(parsed);
};

// Function to process a single file
async function checkFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const { data } = matter(content);
    const issues = [];

    // Check date field
    if (data.date) {
      if (!isValidDate(data.date)) {
        issues.push(`Invalid 'date' value: ${data.date}`);
      }
    } else {
      issues.push("Missing 'date' field");
    }

    // Check date_updated field if it exists
    if (data.date_updated && !isValidDate(data.date_updated)) {
      issues.push(`Invalid 'date_updated' value: ${data.date_updated}`);
    }

    if (issues.length > 0) {
      console.log(`\n📄 ${path.relative(BLOG_DIR, filePath)}`);
      issues.forEach(issue => console.log(`   ⚠️  ${issue}`));
    }
  } catch (err) {
    console.error(`\n❌ Error processing ${filePath}:`, err);
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
    console.log('🔍 Scanning for invalid dates in markdown files...\n');
    
    const files = await findMdFiles(BLOG_DIR);
    console.log(`Found ${files.length} markdown files to check`);
    
    let hasIssues = false;
    for (const file of files) {
      await checkFile(file);
      hasIssues = true;
    }
    
    if (!hasIssues) {
      console.log('\n✅ No date issues found!');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

main(); 