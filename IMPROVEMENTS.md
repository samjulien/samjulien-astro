# Blog Improvements Tracker

This document tracks quality of life improvements and feature enhancements for samjulien.com. Items marked with ✅ are complete, items marked with 📋 are planned.

## Completed Features

### ✅ RSS Feed
- **Status:** Merged (#10)
- **Description:** RSS feed at `/rss.xml` for blog subscribers
- **Features:**
  - Filters for published posts only
  - Includes title, description, date, and tags
  - Autodiscovery link in site `<head>`
  - Title: "Sam Julien's writing"

### ✅ Reading Time Estimates
- **Status:** Merged (#13)
- **Description:** Display estimated reading time on all blog posts
- **Features:**
  - Shows "X min read" next to dates
  - Uses 200 words per minute calculation
  - Strips markdown/code for accurate counting
  - Visible on both individual posts and writing archive

### ✅ Related Posts
- **Status:** Merged (#12)
- **Description:** Show 2-3 related articles at bottom of posts based on shared tags
- **Features:**
  - Scores posts by number of shared tags
  - Shows title, date, description, and tags
  - Responsive grid layout
  - Only displays if related posts exist

### ✅ Code Copy Buttons
- **Status:** Merged (#9)
- **Description:** One-click copy for code snippets
- **Features:**
  - Hover to reveal copy button
  - Visual feedback with check icon
  - Styled to match Night Owl theme
  - Works on all code blocks

### ✅ Dark Mode
- **Status:** Merged (#15)
- **Description:** Toggle between light/dark themes
- **Features:**
  - Respects system preference by default
  - Stores user preference in localStorage
  - No flash of wrong theme on page load
  - Toggle button with sun/moon icons in navigation
  - Green brand color works well in both modes
  - All pages and components support dark mode

### ✅ Tag Navigation
- **Status:** Merged (#18)
- **Description:** Browse and filter articles by tag
- **Features:**
  - Tags index page at `/tags` showing all tags with article counts
  - Individual tag pages at `/tags/[tag]` (e.g., `/tags/devrel`)
  - Clickable tag links on individual blog posts
  - Clickable tags on writing archive page
  - Clickable tags in related posts section
  - Tags styled consistently with green theme colors
  - Dark mode support for all tag elements

### ✅ Post Series Support
- **Status:** Merged (#16)
- **Description:** Link related posts in a series (like the burnout/progress system series)
- **Features:**
  - `series` and `series_order` fields in frontmatter schema
  - Prev/next navigation for series posts
  - Series navigation component at top and bottom of posts
  - Automatically links posts within same series

### ✅ Tag Restructuring
- **Status:** Merged (#17)
- **Description:** Reorganized blog post tags for better categorization
- **Features:**
  - Consolidated and standardized tag names across all posts
  - Improved content discoverability through consistent tagging

### ✅ Markdown Content Pages
- **Status:** Merged (#19)
- **Description:** Convert Now and Uses pages to use Markdown content
- **Features:**
  - Now and Uses pages use MDX content files
  - Easier to update without touching Astro components
  - Consistent content management approach

### ✅ Content Categorization System
- **Status:** Merged (#22)
- **Description:** Categorize posts for content curation and archiving
- **Features:**
  - `category` field in blog schema (product, productivity, devrel, technical, archive)
  - All 101 posts categorized
  - Archived posts hidden by default on /writing page
  - Toggle button to show/hide archived articles
  - Categories support future content filtering and navigation

### ✅ Brand Repositioning (DevRel → Product)
- **Status:** Merged (#22)
- **Description:** Update site positioning from DevRel focus to Product Management
- **Features:**
  - Hero messaging updated to lead with PM role
  - Page title changed to "Product & Developer Experience"
  - Pinned posts curated for PM/productivity focus (5 posts)
  - DevRel background positioned as differentiator, not primary identity

### ✅ Table of Contents
- **Status:** Merged (#25)
- **Description:** Auto-generate TOC for longer posts using heading structure
- **Features:**
  - Sticky sidebar on desktop showing "On this page" with heading links
  - Collapsible details element on mobile
  - Active section highlighting on scroll
  - Only displays on posts with 3+ h2/h3 headings
  - Smooth hover transitions with brand green colors
  - Dark mode support

## Planned Features

### Content Discovery & Navigation

#### 📋 Breadcrumbs
- **Priority:** Low
- **Description:** Show navigation path (Home > Writing > Post Title)
- **Implementation:**
  - Helps with context and navigation
  - Simple component in Layout
- **Complexity:** Low

### Technical Enhancements

#### 📋 Image Lightbox/Zoom
- **Priority:** Low
- **Description:** Click to enlarge images in posts
- **Implementation:**
  - Better viewing for screenshots/diagrams
  - Many of your posts have multiple images
  - Could use simple library or build custom
- **Complexity:** Low

### Reading Experience

#### 📋 Reading Progress Indicator
- **Priority:** Low
- **Description:** Thin progress bar at top showing scroll progress
- **Implementation:**
  - Helpful for longer articles
  - Non-intrusive visual feedback
  - Client-side React/JS component
- **Complexity:** Low

#### 📋 Estimated Position Indicator
- **Priority:** Low
- **Description:** "You're 60% through this article"
- **Implementation:**
  - Helps readers gauge time commitment
  - Could combine with reading time
- **Complexity:** Low

### Author & Social

#### ✅ Social Share Buttons
- **Status:** Complete (pending PR)
- **Description:** Quick share to X (Twitter), LinkedIn, and copy link
- **Features:**
  - Share buttons appear below tags on blog posts
  - X and LinkedIn links pre-populated with title and URL
  - Copy link button with visual feedback when clicked
  - Dark mode support
  - Icon components: XIcon, LinkedInIcon, LinkIcon in `src/components/icons/`

#### ✅ Newsletter CTA Variations
- **Status:** Merged (#26)
- **Description:** Different CTAs based on post topic
- **Features:**
  - Topic-specific headlines based on post category (product, productivity, devrel, technical)
  - Fallback to tag-based detection for uncategorized posts
  - Inline CTA placement in blog posts (after content, before related posts)
  - Distinct styling for inline variant (green accent) vs footer (gray)
  - Dark mode support for all variants

### Content Management

#### 📋 Last Updated Badge
- **Priority:** Low
- **Description:** Prominent badge when `date_updated` differs from `date`
- **Implementation:**
  - "Updated 3 months ago" visual indicator
  - You already track this in frontmatter!
  - Just needs visual treatment
- **Complexity:** Low

#### 📋 Content Templates
- **Priority:** Low
- **Description:** Scaffold script for new posts
- **Implementation:**
  - Auto-generate folder structure and frontmatter
  - You have `new_post.sh` in gitignore - maybe expand this?
  - Could be enhanced with CLI prompts
- **Complexity:** Low

### Search & Discovery

#### 📋 Improved Search
- **Priority:** High
- **Description:** Enhanced search functionality
- **Implementation:**
  - You have SearchBar component - enhance with:
    - Search by tag, title, content (currently client-side JS filter)
    - Instant results preview
    - Keyboard shortcuts (⌘K to search)
  - Could use Pagefind, Fuse.js, or Algolia
- **Complexity:** Medium-High

## Implementation Notes

### Quick Wins (Easiest to Implement)
1. Last Updated Badge - Data already exists, just needs styling
2. Breadcrumbs - Simple component
3. ~~Social Share Buttons - Basic links~~ ✅ Completed
4. Image Lightbox - Can use simple library

### High Impact Features
1. ~~Dark Mode - Very popular request~~ ✅ Completed
2. ~~Tag/Category Pages - Better content organization~~ ✅ Completed
3. ~~Post Series Support - Link related posts~~ ✅ Completed
4. ~~Content Categorization - Archive management~~ ✅ Completed
5. Improved Search - Better content discovery
6. ~~Table of Contents - Improves readability of long posts~~ ✅ Completed

### Complexity Estimates
- **Low:** Can be implemented in 1-2 hours
- **Medium:** Requires 3-6 hours or external service integration
- **High:** Needs significant architecture changes or complex integrations

## Contributing

When implementing features from this list:
1. Create a new branch following the pattern `claude/[feature-name]-[session-id]`
2. Update this file to mark the feature as complete with PR number
3. Add implementation details if different from planned approach
4. Reference this file in PR description

## Priority Guidelines

- **High:** Significant user experience improvement or frequently requested
- **Medium:** Nice to have, improves specific use cases
- **Low:** Polish or edge case improvements

---

**Last Updated:** 2026-01-03
**Maintained by:** AI assistants and contributors
