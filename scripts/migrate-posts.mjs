import { readdir, readFile, writeFile, mkdir, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = join(__dirname, '../src/content/blog');
const publicImagesDir = join(__dirname, '../public/images/blog');

async function migratePost(postPath) {
  // Try reading index.mdx first, fall back to index.md
  let content;
  try {
    content = await readFile(join(postPath, 'index.mdx'), 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        content = await readFile(join(postPath, 'index.md'), 'utf-8');
      } catch (error) {
        if (error.code === 'ENOENT') {
          // Try filename matching directory name
          const dirName = postPath.split('/').pop();
          content = await readFile(join(postPath, `${dirName}.md`), 'utf-8');
        } else {
          throw error;
        }
      }
    } else {
      throw error;
    }
  }
  
  // Get post name from directory
  const postName = postPath.split('/').pop();
  
  // Create new directory structure
  const imagesDir = join(postPath, 'images');
  try {
    const images = await readdir(imagesDir);
    
    // Create post-specific directory in public/images/blog if it doesn't exist
    await mkdir(join(publicImagesDir, postName), { recursive: true });
    
    // Copy and update image paths
    let updatedContent = content;
    for (const image of images) {
      const oldPath = join(imagesDir, image);
      const newPath = join(publicImagesDir, postName, image);
      await copyFile(oldPath, newPath);
      
      // Update image references in the content
      updatedContent = updatedContent.replace(
        `./images/${image}`,
        `/images/blog/${postName}/${image}`
      );
    }
    
    // Write the updated MDX file
    const newMdxPath = join(postsDir, `${postName}.mdx`);
    await writeFile(newMdxPath, updatedContent);
    
    console.log(`✅ Migrated ${postName}`);
  } catch (error) {
    if (error.code !== 'ENOENT') { // Ignore if images directory doesn't exist
      console.error(`❌ Error processing ${postName}:`, error);
    }
  }
}

async function migrate() {
  try {
    // Create necessary directories
    await mkdir(postsDir, { recursive: true });
    await mkdir(publicImagesDir, { recursive: true });
    
    // Get all post directories
    const posts = await readdir(join(__dirname, '../src/pages/blog'), {
      withFileTypes: true
    });
    
    // Process each post
    for (const post of posts) {
      if (post.isDirectory() && post.name.match(/^\d{4}-\d{2}-\d{2}/)) {
        await migratePost(join(__dirname, '../src/pages/blog', post.name));
      }
    }
    
    console.log('✨ Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrate();