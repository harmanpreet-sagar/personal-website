# Personal Website

A modern portfolio website built with Next.js, TypeScript, and React.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
personal-website/
├── app/
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── components/
│   ├── BackgroundElements.tsx  # Animated background elements
│   ├── Navigation.tsx          # Navigation bar with scroll effects
│   ├── Hero.tsx                # Hero section
│   ├── StatsBar.tsx            # Statistics bar
│   ├── About.tsx               # About section
│   ├── Experience.tsx          # Experience timeline
│   ├── Projects.tsx            # Projects grid
│   └── Footer.tsx               # Footer section
├── package.json
├── tsconfig.json
└── next.config.js
```

## Features

- **TypeScript**: Full type safety
- **Next.js 14**: App Router with React Server Components
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Scroll-based animations and transitions
- **Modern UI**: Clean, professional design with animated background elements

## Customization

To customize the content:

1. **Personal Information**: Edit the components in the `components/` directory
2. **Skills**: Update the `skills` array in `components/About.tsx`
3. **Experience**: Update the `experiences` array in `components/Experience.tsx`
4. **Projects**: Update the `projects` array in `components/Projects.tsx`
5. **Profile Image**: Replace the "HS" placeholder in `components/Hero.tsx` with an actual image

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
