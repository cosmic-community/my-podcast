# My Podcast

![App Preview](https://imgix.cosmicjs.com/79f075c0-18c2-11f1-a3e6-0569ca0db350-autopilot-photo-1451187580459-43490279c0fa-1772735897307.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, beautifully designed podcast website built with **Next.js 16** and **[Cosmic](https://www.cosmicjs.com)** CMS. Features a dark cinematic aesthetic with vibrant purple accents, showcasing your episodes, series, and guest profiles in an immersive audio-focused experience.

## Features

- 🎧 **Episode Showcase** - Browse all episodes with descriptions, episode numbers, and publish dates
- 🎙️ **Series Organization** - Group episodes by series with cover images and descriptions
- 👤 **Guest Profiles** - Highlight guest appearances with bios, photos, and website links
- 🎨 **Dark Cinematic Design** - Modern dark theme with vibrant purple/indigo accents
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** - Fast page loads with Next.js 16 App Router
- 🔗 **Deep Content Linking** - Episodes connect to series and guests with full relationship support
- 📝 **Rich Show Notes** - Full show notes with proper formatting on episode detail pages

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69a9cd4c509535b32ff02ea6&clone_repository=69a9cec4509535b32ff0373e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a podcast website with episodes (including audio URL, description, and show notes), series, and guest profiles."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'My Podcast'. The content is managed in Cosmic CMS with the following object types: guests, series, episodes. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com) - Headless CMS for content management ([Docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with your podcast content

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set environment variables:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```
4. Run the development server:
   ```bash
   bun dev
   ```

## Cosmic SDK Examples

### Fetching Episodes with Related Data
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: episodes } = await cosmic.objects
  .find({ type: 'episodes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(2)
```

### Fetching a Single Episode by Slug
```typescript
const { object: episode } = await cosmic.objects
  .findOne({ type: 'episodes', slug: 'my-episode-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(2)
```

## Cosmic CMS Integration

This app uses three content types from Cosmic:
- **Episodes** (`episodes`) - Audio episodes with show notes, series, and guest connections
- **Series** (`series`) - Episode groupings with cover images
- **Guests** (`guests`) - Guest profiles with bios and photos

All data is fetched server-side for optimal performance and SEO.

## Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy

### Netlify
1. Push to GitHub
2. Import project to [Netlify](https://netlify.com)
3. Add environment variables in site settings
4. Deploy with `bun run build` as build command

<!-- README_END -->