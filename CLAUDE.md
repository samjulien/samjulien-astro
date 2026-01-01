# CLAUDE.md - AI Assistant Guide for samjulien-astro

This document provides comprehensive guidance for AI assistants working with the Sam Julien personal website codebase.

## Repository Overview

**Project Name:** samjulien-astro
**Website URL:** https://www.samjulien.com
**Purpose:** Personal website and blog for Sam Julien, Director of Developer Relations and AI Engineer
**Primary Author:** Sam Julien
**Design Credit:** [Vojta](http://vojta.io)
**Hosting:** Netlify
**Migration History:** Migrated from Gatsby to Astro using Bolt.new and Cursor

## Tech Stack

### Core Framework
- **Astro 5.1.1** - Static site generator with island architecture
- **Node.js** - Runtime environment (ES Modules)

### UI & Styling
- **React 19.0.0** - For interactive components
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **@tailwindcss/typography** - Prose styling for markdown content
- **PostCSS & Autoprefixer** - CSS processing

### Content & Data
- **MDX** - Markdown with JSX support via @astrojs/mdx
- **Astro Content Collections** - Type-safe content management
- **date-fns** - Date formatting and manipulation

### Forms & Validation
- **Formik 2.4.5** - Form management
- **Yup 1.3.3** - Schema validation

### Integrations
- **ConvertKit** - Email newsletter subscription
- **Airtable** - Data storage (API integration)
- **Fathom Analytics** - Privacy-focused analytics (SIYTBEQN)

### Deployment
- **@astrojs/netlify** - Netlify adapter for SSR/API routes
- **@astrojs/sitemap** - Automatic sitemap generation

## Project Structure

```
samjulien-astro/
├── public/                      # Static assets served directly
│   ├── favicon.png
│   ├── ogimage.png             # Default OG image
│   ├── robots.txt
│   └── fonts/                  # Font files (CascadiaCode)
├── src/
│   ├── assets/                 # Optimized images (processed by Astro)
│   │   ├── angular_solidBlack.png
│   │   ├── cloud-infrastructure.png
│   │   ├── devrel-crop.jpg
│   │   ├── gatsby_logo_tiny.png
│   │   ├── ghost-course.png
│   │   ├── gte-cover.jpg
│   │   ├── samindia_cropped.jpg
│   │   ├── signpost.svg
│   │   └── upgrade.png
│   ├── components/             # Reusable UI components
│   │   ├── forms/              # Form components (React)
│   │   │   └── NewsletterForm.tsx
│   │   ├── home/               # Homepage sections
│   │   │   ├── Hero.astro
│   │   │   ├── BooksSection.astro
│   │   │   └── PopularArticles.astro
│   │   ├── icons/              # Icon components
│   │   │   └── SearchIcon.astro
│   │   ├── shared/             # Shared components
│   │   │   └── EmailSignup.astro
│   │   ├── talks/              # Talks-related components
│   │   │   ├── TalkType.astro
│   │   │   ├── TalksList.astro
│   │   │   └── YearSection.astro
│   │   ├── writing/            # Writing-related components
│   │   │   └── SearchBar.astro
│   │   ├── BookCard.astro
│   │   ├── EditorEmbed.astro
│   │   ├── Egghead.astro       # Egghead.io embed
│   │   ├── EmailSignup.astro
│   │   ├── GatsbyBanner.astro
│   │   ├── GuideBanner.astro
│   │   ├── Navigation.astro    # Main site navigation
│   │   ├── Video.astro
│   │   └── YouTube.astro       # YouTube embed
│   ├── data/                   # Content collections
│   │   └── blog/               # Blog post content
│   │       └── YYYY-MM-DD-slug/  # Date-prefixed folders
│   │           ├── index.md    # OR index.mdx
│   │           └── images/     # Post-specific images
│   ├── layouts/                # Page layouts
│   │   └── Layout.astro        # Main site layout
│   ├── pages/                  # File-based routing
│   │   ├── api/                # API endpoints (SSR)
│   │   │   └── subscribe.ts    # Newsletter subscription
│   │   ├── [id].astro          # Dynamic blog post route
│   │   ├── 404.astro           # 404 error page
│   │   ├── email-feedback.astro
│   │   ├── email-thanks.astro
│   │   ├── index.astro         # Homepage
│   │   ├── now.astro           # "Now" page
│   │   ├── talks.astro         # Talks listing
│   │   ├── uses.astro          # Tools/gear used
│   │   └── writing.astro       # Blog archive
│   ├── styles/                 # Global styles
│   │   ├── code.css            # Code syntax highlighting
│   │   └── fonts.css           # Font definitions
│   └── content.config.ts       # Content collections config
├── .env.example                # Environment variables template
├── .gitignore
├── astro.config.mjs            # Astro configuration
├── package.json
├── postcss.config.cjs          # PostCSS config
├── tailwind.config.mjs         # Tailwind configuration
└── README.md
```

## Content Management

### Blog Post Structure

Blog posts are managed using Astro Content Collections and follow a strict file structure:

**Location:** `src/data/blog/YYYY-MM-DD-slug/`

**Naming Convention:**
- Folder: `YYYY-MM-DD-slug` (date prefix with descriptive slug)
- Main file: `index.md` or `index.mdx`
- Images: `images/` subfolder

**Frontmatter Schema:**
```yaml
---
title: 'Post Title'                    # Required: string
slug: 'url-slug'                       # Optional: defaults to folder name
description: 'Brief description'       # Optional: string
date: YYYY-MM-DD                       # Required: date (coerced)
date_updated: YYYY-MM-DD               # Optional: date (coerced)
ogimage: 'images/og-image.png'         # Optional: relative path
published: true                        # Optional: boolean (default undefined)
pinned: false                          # Optional: boolean for featured posts
tags:                                  # Optional: array of strings
  - Tag1
  - Tag2
---
```

**Content Collection Configuration** (src/content.config.ts):
- Loader: `glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/blog" })`
- Files starting with `_` are ignored
- Both `.md` and `.mdx` files are supported

### Blog Post Rendering

**Dynamic Route:** `src/pages/[id].astro`
- Uses `getStaticPaths()` to generate routes from content collection
- Renders content with `await render(post)`
- Displays `date_updated` if available, otherwise `date`
- Wrapped in `prose lg:prose-xl` typography classes

## Development Workflow

### Available Scripts

```bash
npm run dev        # Start development server
npm start          # Alias for dev
npm run build      # Build for production
npm run preview    # Preview production build
npm run astro      # Run Astro CLI commands
```

### Environment Variables

Required for full functionality (see `.env.example`):

```bash
# Airtable (if using data integration)
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here

# ConvertKit (newsletter subscription)
PUBLIC_CONVERTKIT_SIGNUP_FORM=your_form_id_here
PUBLIC_CONVERTKIT_PUBLIC_KEY=your_public_key_here
```

### Local Development Setup

1. Clone repository
2. Run `npm install`
3. Create `.env` file from `.env.example`
4. Add required API keys
5. Run `npm run dev`
6. Visit `http://localhost:4321`

## Key Conventions

### File Naming
- **Components:** PascalCase for React (`.tsx`), PascalCase for Astro (`.astro`)
- **Pages:** kebab-case (`.astro`)
- **Blog folders:** `YYYY-MM-DD-slug` format
- **Assets:** lowercase with hyphens

### Component Organization
- **Astro components** (`.astro`): For static/server-rendered content
- **React components** (`.tsx`): For client-side interactivity
- **Component location:**
  - Generic: `src/components/`
  - Page-specific: `src/components/[page-name]/`
  - Forms: `src/components/forms/`
  - Icons: `src/components/icons/`

### Import Conventions
```javascript
// Astro components
import Layout from '../layouts/Layout.astro';
import Hero from '../components/home/Hero.astro';

// React components (with client directive when needed)
<NewsletterForm client:load />

// Assets (optimized by Astro)
import ogImage from "../../public/ogimage.png";

// Content Collections
import { getCollection, render } from 'astro:content';
```

## Component Architecture

### Main Layout (`src/layouts/Layout.astro`)

**Props:**
- `title: string` (required)
- `description?: string` (default: site description)
- `image?: ImageMetadata` (default: /ogimage.png)
- `noFooter?: boolean` (default: false)

**Features:**
- Full SEO metadata (Open Graph, Twitter Cards)
- Fathom Analytics integration
- Google Fonts (Recursive variable font)
- Navigation component
- Optional newsletter signup
- Footer with copyright

**Structure:**
```astro
<Layout title="Page Title" description="..." image={...}>
  <!-- Page content here -->
</Layout>
```

### React Integration

React components must use client directives:
- `client:load` - Load immediately
- `client:idle` - Load when main thread is free
- `client:visible` - Load when visible
- `client:media` - Load based on media query

**Example:**
```astro
---
import NewsletterForm from '../components/forms/NewsletterForm';
---

<NewsletterForm client:load />
```

## Styling Approach

### Tailwind Configuration

**Custom Theme Extensions:**
- **Font Family:**
  - `mono`: Recursive (monospace variant)
  - `sans`: Recursive (sans-serif)

- **Custom Colors:**
  - `green`: Full palette (50-900)
  - `brand`: #10AC84 (primary green)
  - `brand-dark`: #0E9B77

- **Typography Plugin:**
  - Custom font variation settings for Recursive
  - Customized heading, code, and emphasis styles
  - Max width: 85ch
  - Link colors use green palette

### Font Variation Settings

The site uses the Recursive variable font with custom settings:

```css
/* Base text */
'MONO' 0, 'CASL' 0, 'wght' 400, 'slnt' 0, 'CRSV' 0.5

/* Code/Pre */
'MONO' 1, 'CASL' 0, 'wght' 400, 'slnt' 0, 'CRSV' 0.5

/* Headings */
'MONO' 0, 'CASL' 0.1, 'wght' 800, 'slnt' 0, 'CRSV' 0.5

/* Strong */
'MONO' 0, 'CASL' 0, 'wght' 800, 'slnt' 0, 'CRSV' 0.5

/* Emphasis */
'MONO' 0, 'CASL' 0.3, 'wght' 400, 'slnt' -12, 'CRSV' 0.5
```

### Code Syntax Highlighting

**Theme:** Night Owl
**Configuration:** Set in `astro.config.mjs`
**Custom Styles:** `src/styles/code.css`

### Utility Class Patterns

```astro
<!-- Layout -->
<div class="max-w-4xl mx-auto px-4 py-8">

<!-- Typography -->
<article class="prose lg:prose-xl max-w-none">

<!-- Buttons -->
<button class="bg-brand hover:bg-brand-dark text-white font-bold py-2 px-6 rounded">

<!-- Forms -->
<input class="w-full px-4 py-2 border rounded">
```

## API Routes

### Newsletter Subscription (`/api/subscribe`)

**File:** `src/pages/api/subscribe.ts`
**Method:** POST
**Prerender:** Disabled (SSR)

**Request Body:**
```json
{
  "email": "user@example.com",
  "first_name": "Name"
}
```

**Response:**
```json
// Success (200)
{ /* ConvertKit response data */ }

// Error (400)
{ "error": "Subscription failed" }

// Error (500)
{ "error": "Internal server error" }
```

**Environment Variables Required:**
- `PUBLIC_CONVERTKIT_SIGNUP_FORM`
- `PUBLIC_CONVERTKIT_PUBLIC_KEY`

**Analytics Tracking:**
- Fathom goal tracking on success: `IACNIPCU`

## Deployment

### Netlify Configuration

**Adapter:** `@astrojs/netlify`
**Build Command:** `npm run build`
**Publish Directory:** `dist/`

**Features:**
- Server-side rendering for API routes
- Automatic sitemap generation
- Redirects handled by Netlify

### Build Process

1. Content collections are built
2. Static pages are generated
3. API routes are prepared for SSR
4. Sitemap is generated
5. Assets are optimized

## Important Configuration Files

### astro.config.mjs

```javascript
{
  site: 'https://www.samjulien.com',  // Required for sitemap
  integrations: [react(), tailwind(), mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'night-owl', wrap: true }
  },
  adapter: netlify()
}
```

### tailwind.config.mjs

- Custom green color palette
- Recursive font family
- Typography plugin with custom styles
- Content paths for all component types

### content.config.ts

- Defines `blog` collection
- Glob loader with pattern exclusion
- Zod schema for frontmatter validation
- Image optimization integration

### package.json

- Type: `module` (ES Modules)
- Private repository
- Scripts for dev, build, preview

## Git Workflow & Branch Conventions

### Branch Naming Convention

When working with this repository, AI assistants should follow this pattern:

**Format:** `claude/[task-description]-[session-id]`

**Current Branch:** `claude/add-claude-documentation-AAPME`

### Important Git Rules

1. **NEVER push to main/master** without explicit permission
2. **Always develop on feature branches** starting with `claude/`
3. **Branch names must end with matching session ID** for push to succeed
4. **Push with:** `git push -u origin <branch-name>`
5. **Retry network failures** up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

### Commit Message Style

Review recent commits for style guidance:
```bash
git log --oneline -10
```

Recent examples:
- "Add new articles (#7)"
- "Update now page for June 2025"
- "feat: Add now and uses pages (#6)"
- "Developer motion series (#4)"
- "Add Bee article (#5)"

**Conventions:**
- Use imperative mood ("Add" not "Added")
- Keep first line concise
- Reference PR numbers when applicable
- Use conventional commit prefixes when appropriate (feat:, fix:, etc.)

## Common Tasks for AI Assistants

### Adding a New Blog Post

1. Create folder: `src/data/blog/YYYY-MM-DD-slug/`
2. Add `index.md` or `index.mdx`
3. Include required frontmatter (title, date)
4. Add images to `images/` subfolder if needed
5. Set `published: true` when ready
6. Test locally with `npm run dev`

### Modifying Components

1. **Astro components:** Mostly server-rendered, can use TypeScript in frontmatter
2. **React components:** Use for client interactivity, require client directives
3. **Maintain existing patterns:** Follow component organization structure
4. **Test builds:** Run `npm run build` to catch type errors

### Updating Styles

1. **Prefer Tailwind utilities** over custom CSS
2. **Use theme colors:** `brand`, `brand-dark`, green palette
3. **Typography:** Leverage `prose` classes for content
4. **Custom CSS:** Only in `src/styles/` when necessary

### Working with Content Collections

```javascript
// Get all blog posts
const posts = await getCollection('blog');

// Filter published posts
const published = posts.filter(post => post.data.published);

// Sort by date
const sorted = posts.sort((a, b) =>
  b.data.date.getTime() - a.data.date.getTime()
);

// Render a post
const { Content } = await render(post);
```

### Testing Changes

1. **Development:** `npm run dev` - hot reload enabled
2. **Build:** `npm run build` - test for errors
3. **Preview:** `npm run preview` - test production build
4. **Type checking:** TypeScript checks run during build

## SEO & Meta Tags

### Default Values
- **Description:** "Sam Julien is a Developer Relations director, writer, and teacher. He loves helping people level up their developer advocacy, AI engineering, or web development job using Python and JavaScript."
- **OG Image:** `/ogimage.png`
- **Twitter Handle:** `@samjulien`

### Per-Page Overrides
Pass props to Layout component:
```astro
<Layout
  title="Custom Title - Sam Julien"
  description="Custom description"
  image={customImage}
/>
```

## Analytics & Tracking

### Fathom Analytics
- **Site ID:** SIYTBEQN
- **SPA Mode:** Enabled
- **Deferred Loading:** Yes
- **Newsletter Goal:** IACNIPCU

### Tracking Events
```javascript
// In React components
window.fathom?.trackGoal('GOAL_ID', value);
```

## Troubleshooting

### Common Issues

1. **Build failures:**
   - Check frontmatter schema compliance
   - Verify all images exist
   - Run TypeScript check: `npm run build`

2. **Content not appearing:**
   - Check `published: true` in frontmatter
   - Verify file matches glob pattern
   - Ensure not starting with `_`

3. **Styling issues:**
   - Clear `.astro` cache
   - Rebuild: `npm run build`
   - Check Tailwind content paths

4. **API route failures:**
   - Verify environment variables
   - Check `prerender: false` is set
   - Test with preview build

## Performance Considerations

### Image Optimization
- Use `src/assets/` for processed images
- Use `public/` for static assets
- Astro automatically optimizes images from assets

### Code Splitting
- Astro automatically splits by page
- React components load only when needed
- Use appropriate client directives

### Build Output
- Static pages: Pre-rendered HTML
- API routes: Serverless functions
- Assets: Fingerprinted and cached

## Accessibility

### Best Practices
- Use semantic HTML
- Include `alt` text for images
- Label form inputs (use `sr-only` for visual labels)
- Maintain color contrast ratios
- Test keyboard navigation

### Forms
```astro
<label htmlFor="input-id" className="sr-only">
  Input Label
</label>
<input id="input-id" type="text" />
```

## Resources

### Documentation
- [Astro Docs](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX](https://mdxjs.com/)
- [React](https://react.dev/)

### Tools Used
- **Design:** Vojta (http://vojta.io)
- **Migration Tools:** Bolt.new, Cursor
- **Hosting:** Netlify
- **Analytics:** Fathom
- **Newsletter:** ConvertKit

## Contact & Ownership

**Website Owner:** Sam Julien
**Role:** Director of Developer Relations and AI Engineer
**Twitter:** @samjulien
**Website:** https://www.samjulien.com

---

**Last Updated:** 2026-01-01
**Document Version:** 1.0.0
**Maintained by:** AI assistants working with this codebase

When in doubt, follow existing patterns in the codebase and prioritize:
1. Simplicity over complexity
2. Existing conventions over new patterns
3. User experience over technical perfection
4. Content accessibility over visual flair
