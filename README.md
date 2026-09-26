# Minecraft Web

An immersive Minecraft promotional website created as a **competition submission**. The project presents Minecraft's world, gameplay, dimensions, features, and community through an animated, responsive web experience.

> **Disclaimer:** This is an unofficial, non-commercial educational project. It is not approved by, associated with, or endorsed by Mojang Studios, Mojang Synergies AB, or Microsoft. Minecraft trademarks and game assets belong to their respective owners.

## Highlights

- Cinematic hero sections with looping gameplay video backgrounds
- Responsive layouts for desktop, tablet, and mobile screens
- Dedicated pages for the Minecraft story, features, dimensions, community, and downloads
- Interactive gallery pages with category-based routes
- Community gallery filters for browsing different types of player work
- Artwork preview modal with click-outside and Escape-to-close controls
- Scroll-triggered entrance animations and transitions
- Custom Minecraft-inspired typography and visual styling
- Credits page with links to external asset and media sources

## Pages and routes

| Route | Description |
| --- | --- |
| `/` | Landing page with the main hero and promotional sections |
| `/about` | Minecraft story, gameplay activities, and world overview |
| `/feature` | Feature showcase with gameplay demonstrations |
| `/community` | Community-focused content and gallery |
| `/download` | Download/platform information page |
| `/credit` | External assets, media, libraries, and legal attribution |
| `/gallery/:categorySlug` | Detail view for a selected gallery category |

## Technology stack

### Core

- **React 19** - Component-based user interface
- **TypeScript 6** - Static typing for application code
- **Vite 8** - Development server and production build tool
- **React Router 7** - Client-side routing and page navigation

### Styling and motion

- **Tailwind CSS 4** - Utility-first styling support through the Vite plugin
- **CSS** - Page- and component-specific visual styles
- **GSAP 3** - High-performance animations
- **GSAP React** - React lifecycle integration for GSAP animations
- **ScrollTrigger** - Scroll-based animation effects

### Development tools

- **ESLint** - Code-quality and linting checks
- **TypeScript compiler** - Type checking and project builds
- **Vercel** - Intended hosting and continuous deployment platform

## Getting started

### Requirements

- Node.js 20 or newer
- npm 10 or newer

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/ryn-01/minecraft-web.git
cd minecraft-web
npm install
```

### Run locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server with HMR |
| `npm run build` | Type-check the project and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

Before submitting a competition build, run:

```bash
npm run lint
npm run build
```

## Project structure

```text
.
├── public/
│   └── videos/          # Gameplay and background video assets
├── src/
│   ├── assets/          # Fonts, images, and bundled assets
│   ├── components/      # Shared navigation and footer components
│   ├── pages/           # Route-level page components
│   ├── sections/        # Reusable sections used by pages
│   ├── App.tsx          # Browser routes
│   └── main.tsx         # Application entry point
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Credits and attribution

This project includes original layout, code, interactions, and screen recordings created for the competition submission. It also uses or references the following external resources:

- **Icons8** - Windows, macOS, and Linux platform icons: [icons8.com](https://icons8.com)
- **Minecraft Faces** - Villager and Creeper character face graphics: [minecraftfaces.com](https://minecraftfaces.com)
- **Minecraft Wiki** - Community-sourced item, ore, and block sprites: [minecraft.fandom.com](https://minecraft.fandom.com)
- **DaFont** - Minecrafter display font: [Minecrafter on DaFont](https://www.dafont.com/minecrafter.font)
- **Minecraft YouTube channel** - Ambient glowing caves video reference: [Soothing Minecraft – Glowing Caves](https://youtu.be/hJLgLTpI9U8)
- **GSAP** - Animation engine and ScrollTrigger: [gsap.com](https://gsap.com)
- **React, Vite, Tailwind CSS, and React Router** - Application framework and tooling
- **Vercel** - Hosting and deployment platform

Please review the original licenses and usage terms for each external resource before redistributing or publishing this project outside the competition.

## License

This repository is provided for educational and competition purposes. No ownership of Minecraft assets, trademarks, or third-party resources is claimed by this project. Refer to the original rights holders and licenses for those materials.
