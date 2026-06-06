# School Marketing Website

A data-driven school marketing website built with React, TypeScript, and Tailwind CSS. All content — programs, faculty, news, admissions, gallery, and branding — is managed through YAML data files, making it easy to white-label or repurpose for any institution.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v7 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Data | js-yaml (YAML data files) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
npm install
npm run dev
```

### Other scripts

```bash
npm run build    # Type-check and build for production
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── layout/        # Header, footer, page hero
│   ├── sections/      # Full-page sections (Hero, Admissions, Contact, etc.)
│   ├── landing/       # Landing page-specific sections
│   ├── academics/     # Academics page sections
│   ├── about/         # About page sections
│   └── news/          # News listing section
├── pages/             # Route-level page components
├── data/
│   ├── schoolLoader.ts          # YAML loader utility
│   └── schoolData/              # All content and config (YAML)
│       ├── school.yaml          # School name, colors, contact info
│       ├── hero.yaml            # Hero section content and CTAs
│       ├── academics.yaml       # Programs and faculty data
│       ├── admissions.yaml      # Requirements and enrollment periods
│       ├── news.yaml            # News articles
│       ├── gallery.yaml         # Gallery images
│       ├── testimonials.yaml    # Student/alumni testimonials
│       ├── partners.yaml        # Industry partners
│       ├── faculty.yaml         # Faculty profiles
│       ├── about.yaml           # History, VMC, timeline
│       └── contact.yaml         # Contact form config
└── types/
    └── school.ts      # TypeScript types for all data shapes
```

## Customizing Content

All site content lives in `src/data/schoolData/`. To adapt this site for a different school:

1. Update `school.yaml` — set the school name, tagline, `primaryColor`, `secondaryColor`, and contact details.
2. Edit the remaining YAML files to replace programs, faculty, news, testimonials, and gallery content.
3. Replace `public/favicon.svg` and `src/assets/hero.png` with school-specific assets.

Brand colors defined in `school.yaml` are exposed as CSS custom properties (`--school-primary`, `--school-secondary`) and applied throughout all components automatically.

## Pages

| Route | Page |
|---|---|
| `/` | Landing page |
| `/about` | About (history, VMC, timeline) |
| `/academics` | Programs, faculty, outcomes |
| `/admissions` | *(section on landing page)* |
| `/news` | News listing |
| `/news/:slug` | News article detail |
| `/gallery` | Photo gallery |
| `/contact` | Contact form |
