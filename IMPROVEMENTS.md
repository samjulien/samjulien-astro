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

## Planned Features

### Content Discovery & Navigation

#### 📋 Table of Contents
- **Priority:** Medium
- **Description:** Auto-generate TOC for longer posts using heading structure
- **Implementation:**
  - Sticky sidebar on desktop
  - Collapsible on mobile
  - Especially useful for technical/tutorial content
- **Complexity:** Medium

#### 📋 Tag/Category Pages
- **Priority:** Medium
- **Description:** Individual pages for each tag (e.g., `/tags/productivity`)
- **Implementation:**
  - Tag cloud or list on writing page
  - You already have tags in frontmatter but no tag filtering UI
  - Dynamic routes for tag pages
- **Complexity:** Low-Medium

#### 📋 Post Series Support
- **Priority:** Low
- **Description:** Link related posts in a series (like the burnout/progress system series)
- **Implementation:**
  - Add `series` and `series_order` to frontmatter schema
  - Prev/next navigation for series
  - Badge showing "Part 2 of 5" etc.
- **Complexity:** Medium

#### 📋 Breadcrumbs
- **Priority:** Low
- **Description:** Show navigation path (Home > Writing > Post Title)
- **Implementation:**
  - Helps with context and navigation
  - Simple component in Layout
- **Complexity:** Low

### Technical Enhancements

#### 📋 Dark Mode
- **Priority:** High
- **Description:** Toggle between light/dark themes
- **Implementation:**
  - Respect system preference by default
  - Your green brand color would work well in dark mode
  - Store preference in localStorage
  - Toggle button in navigation
- **Complexity:** Medium

#### 📋 View Counter or Popular Posts
- **Priority:** Medium
- **Description:** Surface popular content using Fathom analytics
- **Implementation:**
  - You have Fathom analytics - could use API to get page views
  - "Trending this week" section on homepage
  - Validates what resonates with readers
- **Complexity:** Medium-High (requires Fathom API integration)

#### 📋 Image Lightbox/Zoom
- **Priority:** Low
- **Description:** Click to enlarge images in posts
- **Implementation:**
  - Better viewing for screenshots/diagrams
  - Many of your posts have multiple images
  - Could use simple library or build custom
- **Complexity:** Low

#### 📋 Print Stylesheet
- **Priority:** Low
- **Description:** Optimized printing for readers who prefer hard copy
- **Implementation:**
  - Remove navigation, clean formatting
  - Ensure code blocks format well
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

#### 📋 Social Share Buttons
- **Priority:** Medium
- **Description:** Quick share to Twitter, LinkedIn
- **Implementation:**
  - Pre-populated with title and URL
  - "Click to Tweet" for quotable sections
  - Could be simple links (no tracking)
- **Complexity:** Low

#### 📋 Webmentions
- **Priority:** Low
- **Description:** Show Twitter/social mentions of your posts
- **Implementation:**
  - Community engagement visibility
  - Works well with existing content
  - Requires webmention.io or similar service
- **Complexity:** Medium

#### 📋 Newsletter CTA Variations
- **Priority:** Low
- **Description:** Different CTAs based on post topic
- **Implementation:**
  - "Want more DevRel content? Subscribe..."
  - A/B test positioning (inline vs. footer)
  - Conditional based on tags
- **Complexity:** Low-Medium

### Content Management

#### 📋 Draft Preview Mode
- **Priority:** Low
- **Description:** Preview unpublished posts without deploying
- **Implementation:**
  - URL with secret token
  - Currently using `published: false` but no preview mechanism
  - Could use query param or special route
- **Complexity:** Medium

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
2. Print Stylesheet - Pure CSS
3. Breadcrumbs - Simple component
4. Social Share Buttons - Basic links
5. Tag/Category Pages - Astro dynamic routes

### High Impact Features
1. Dark Mode - Very popular request
2. Improved Search - Better content discovery
3. Table of Contents - Improves readability of long posts
4. View Counter - Shows what's popular

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

**Last Updated:** 2026-01-01
**Maintained by:** AI assistants and contributors
