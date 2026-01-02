# SamJulien.com

Hi, I'm Sam Julien, a Product Manager focused on developer tools and AI (currently at [WRITER](https://writer.com), an enterprise AI platform). I spent years leading Developer Relations at Auth0/Okta, which gave me a deep understanding of how developers think and what they actually need from products. I write about product strategy, developer experience, and the practical microskills that help you grow as a builder and leader.

This is the repo for [my personal website](http://www.samjulien.com), built with [Astro](https://astro.build/). [Vojta](http://vojta.io) did the foundational design for this site. It's hosted on [Netlify](https://www.netlify.com/).

I migrated from Gatsby using the [migrating from Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby/) guide with the help of [Bolt.new](https://bolt.new/) and [Cursor](https://www.cursor.so/).

## Tech Stack

- **Astro 5.1.1** - Static site generator with island architecture
- **React 19** - For interactive components
- **Tailwind CSS** - Utility-first styling
- **MDX** - Markdown with JSX support for blog posts
- **TypeScript** - Type-safe development
- **Netlify** - Hosting and deployment

### Integrations

- **ConvertKit** - Newsletter subscription
- **Fathom Analytics** - Privacy-focused analytics
- **Airtable** - Data storage

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or your preferred package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```

4. Add your API keys to `.env`:
   - `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` (if using Airtable integration)
   - `PUBLIC_CONVERTKIT_SIGNUP_FORM` and `PUBLIC_CONVERTKIT_PUBLIC_KEY` (for newsletter)

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:4321` to see the site.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## Project Structure

```
samjulien-astro/
├── src/
│   ├── components/        # Reusable UI components
│   ├── data/
│   │   └── blog/         # Blog posts (YYYY-MM-DD-slug format)
│   ├── layouts/          # Page layouts
│   ├── pages/            # File-based routing
│   │   └── api/         # API endpoints (SSR)
│   └── styles/           # Global styles
├── public/               # Static assets
└── astro.config.mjs      # Astro configuration
```

## Writing Blog Posts

Blog posts are stored in `src/data/blog/` using Astro Content Collections.

### Structure

- Folder: `YYYY-MM-DD-slug/`
- Main file: `index.md` or `index.mdx`
- Images: `images/` subfolder

### Frontmatter

```yaml
---
title: 'Post Title'
slug: 'url-slug'
description: 'Brief description'
date: YYYY-MM-DD
published: true
tags:
  - Tag1
  - Tag2
---
```

## Deployment

The site is automatically deployed to Netlify on push to the main branch.

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist/`

## AI Assistant Guide

For detailed documentation on working with this codebase (especially useful for AI assistants), see [CLAUDE.md](./CLAUDE.md).

## License

This is my personal website. Feel free to use it as inspiration for your own site, but please don't copy it wholesale.