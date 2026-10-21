# Al-Masaed Al-Mubtakirah — Website

Official corporate website, blog, and content management dashboard for Al-Masaed Al-Mubtakirah (Jeddah, Saudi Arabia). Specializing in elevator supply, installation, maintenance, modernization, and spare parts.

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript, React Router
- **Static Generation:** vite-react-ssg (prerendered public pages)
- **Styling:** Tailwind CSS (RTL-first with logical properties)
- **Typography:** Tajawal (self-hosted via `@fontsource/tajawal`)
- **Backend & Database:** Supabase (PostgreSQL, Row Level Security, Auth, Storage)
- **Hosting:** Vercel

## Requirements

- Node.js >= 20.0.0
- npm >= 10.0.0

## Getting Started

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Fill in the required Supabase credentials in `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL` (default: `https://almubtakirah.com`)

4. Start the local development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` — Run the local development server
- `npm run build` — Build and prerender static HTML pages for production
- `npm run preview` — Locally preview the production build
- `npm run typecheck` — Run TypeScript compiler check without emitting files
- `npm run lint` — Lint code using ESLint
- `npm run format` — Format source code with Prettier

## Deployment

The project is configured for deployment on Vercel:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Clean URLs:** Enabled via `vercel.json`
- **Prerendering:** Public routes are generated statically at build time for optimal search engine indexing.
