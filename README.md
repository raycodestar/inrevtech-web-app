# InRevTech Web App

> **Imagine. Create. Impact.**

Premium company website and web application for InRevTech — a technology company specializing in web development, software engineering, AI-powered solutions, ecommerce, SEO, and branding.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| CMS | Sanity.io |
| Backend/DB | Supabase |
| Media | Cloudinary |
| Fonts | Space Grotesk (headings) + Inter (body) |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/inrevtech-web-app.git
cd inrevtech-web-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your values in `.env.local`:

- **Supabase**: Create a project at [supabase.com](https://supabase.com) and get your URL + anon key
- **Sanity**: Create a project at [sanity.io](https://sanity.io) and get your project ID + token
- **Cloudinary**: Create an account at [cloudinary.com](https://cloudinary.com) and get your credentials

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
inrevtech-web-app/
├── app/                        # Next.js App Router pages
│   ├── about/
│   │   ├── page.tsx            # About InRevTech page
│   │   └── founder/
│   │       └── page.tsx        # Founder / CEO page
│   ├── contact/page.tsx
│   ├── get-a-quote/page.tsx
│   ├── insights/page.tsx
│   ├── services/page.tsx
│   ├── work/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Home page
├── components/
│   ├── layout/
│   │   └── Footer.tsx
│   ├── navigation/
│   │   ├── Navbar.tsx          # Desktop navigation with mega menus
│   │   ├── MegaMenu.tsx
│   │   ├── MobileNav.tsx       # Off-canvas mobile navigation
│   │   ├── BottomNav.tsx       # Fixed mobile bottom tab bar
│   │   ├── Logo.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── navConfig.ts        # Navigation structure config
│   ├── sections/
│   │   └── home/               # Home page section components
│   └── ui/                     # shadcn/ui + custom components
├── data/
│   └── placeholder.ts          # Placeholder content data
├── lib/
│   ├── cloudinary/config.ts
│   ├── sanity/
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── types.ts
│   ├── constants.ts
│   ├── metadata.ts
│   └── utils.ts
├── providers/
│   └── ThemeProvider.tsx       # next-themes provider
├── types/
│   └── index.ts                # TypeScript type definitions
└── .env.example
```

---

## Sanity CMS Setup

1. Create a new Sanity project: `npm create sanity@latest`
2. Add your project ID to `.env.local`
3. Create schemas for: `service`, `project`, `testimonial`, `post`, `teamMember`, `companyInfo`
4. Deploy Sanity Studio: `npx sanity deploy`

### Recommended Sanity schemas

- `service` — Service offerings
- `project` — Portfolio projects / case studies
- `testimonial` — Client testimonials
- `post` — Blog / insights articles
- `teamMember` — Team profiles (including founder)
- `companyInfo` — Global company information

---

## Supabase Setup

The database migrations are already applied. Tables created:

- `inquiries` — Contact form and quote request submissions
- `newsletter_subscribers` — Newsletter email list

Row Level Security (RLS) is enabled on all tables.

---

## Cloudinary Setup

1. Create a Cloudinary account
2. Add your cloud name and API credentials to `.env.local`
3. Use `getCloudinaryUrl()` from `lib/cloudinary/config.ts` for optimized image URLs

---

## Deployment (Vercel)

1. Push to GitHub: `git remote add origin https://github.com/your-org/inrevtech-web-app.git`
2. Import to Vercel: [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.example` to Vercel project settings
4. Deploy!

---

## Theme System

The app supports three theme modes:
- **Light** — Cool blue-gray surfaces with dark navy text
- **Dark** — Midnight navy surfaces with electric azure/cyan accents
- **System** — Follows the user's OS preference (default)

Theme preference is persisted to `localStorage` under the key `inrevtech-theme`.

---

## Connect to GitHub

```bash
git init
git add .
git commit -m "Initial commit: InRevTech web app"
git remote add origin https://github.com/YOUR_USERNAME/inrevtech-web-app.git
git branch -M main
git push -u origin main
```

---

## License

Copyright © 2025 InRevTech. All rights reserved.
