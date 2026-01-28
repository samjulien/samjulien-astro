---
name: new-post
description: Transform a Markdown file into a publish-ready blog post. Use when creating new blog posts from draft Markdown files.
---

# New Blog Post

Transform a Markdown file into a publish-ready blog post for samjulien.com.

## Instructions

The user will provide a path to a Markdown file. Read that file, then transform it into a complete, publish-ready blog post.

### Step 1: Read the source file

Use the Read tool to read the file at the path provided by the user: `$ARGUMENTS`

If no path is provided, ask the user for the file path.

### Step 2: Create the frontmatter

Based on the content, generate appropriate frontmatter:

```yaml
---
title: '[Title Case - clear, scannable, 5-10 words]'
slug: '[lowercase-hyphen-separated, 2-5 words]'
description: '[50-150 chars, benefit-focused or action-oriented]'
date: YYYY-MM-DD
published: true
tags:
  - [Choose 1-3 from: DevRel, Product, Productivity, Angular, Career Growth, Content Creation, Speaking, Web Development, Microskills, Tools, AI]
category: '[product | productivity | devrel | technical | archive]'
ogimage: 'images/og-[slug].png'
---
```

**Optional fields (include if applicable):**
- `date_updated: YYYY-MM-DD` - if updating an existing post
- `pinned: true` - for featured posts on homepage
- `series: '[Series Name]'` and `series_order: [number]` - if part of a multi-post series

### Step 3: Frontmatter guidelines

**Title:**
- Use Title Case for all major words
- Formats that work well:
  - "How to [Action]..." (instructional)
  - Descriptive statement (e.g., "Building a Developer Motion")
  - Question format (e.g., "What Is Developer Relations?")

**Description:**
- Keep to 50-150 characters
- Make it benefit-focused or action-oriented
- Good examples:
  - "My journey from burnout to building a better progress system."
  - "How to build and drive developer adoption, from personas to marketing."
  - "Building momentum through consistent reflection."

**Slug:**
- Lowercase with hyphens between words
- Keep to 2-5 descriptive words
- Will be used for folder name and OG image name

**Tags (choose 1-3):**
- Primary topics: DevRel, Product, Productivity, Career Growth
- Technical topics: Angular, Web Development, AI, Tools
- Other: Content Creation, Speaking, Microskills

**Category:**
- `product` - Product management and strategy
- `productivity` - Systems, habits, and personal effectiveness
- `devrel` - Developer relations and advocacy
- `technical` - Code tutorials and technical guides
- `archive` - Legacy or dated content

### Step 4: Format the content

- Start sections with `##` headings (not `#` which is reserved for title)
- Use proper heading hierarchy (`##` > `###` > `####`)
- Reference images as `![alt text](images/filename.jpg)`
- Use fenced code blocks with language identifiers: ```typescript
- Keep paragraphs concise and scannable
- Use bullet points and numbered lists for clarity

### Step 5: Create the blog post

1. Create folder: `src/data/blog/YYYY-MM-DD-[slug]/`
2. Create `images/` subfolder
3. Write `index.md` (or `index.mdx` if JSX components are needed) with frontmatter and formatted content

### Step 6: Generate OG image

Run the OG image generation script from the repo root:
```bash
ENCODED="[URL-encoded-title]" NEW_POST_FOLDER="src/data/blog/YYYY-MM-DD-[slug]" .scripts/new_og.sh
```

To URL-encode the title, replace spaces with `%20` and encode special characters. The script will download the generated image to the `images/` folder.

After running, rename the downloaded file to `og-[slug].png`:
```bash
mv "src/data/blog/YYYY-MM-DD-[slug]/images/og-template.png" "src/data/blog/YYYY-MM-DD-[slug]/images/og-[slug].png"
```

### Step 7: Verify

1. Confirm the post was created at `src/data/blog/YYYY-MM-DD-[slug]/index.md`
2. Confirm the OG image was generated at `src/data/blog/YYYY-MM-DD-[slug]/images/og-[slug].png`
3. Suggest running `npm run dev` to preview the post
