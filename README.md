# 🏔️ EcoAdventures - Tourism Website

A modern, SEO-friendly tourism company portfolio website for trekking and camping programs across India. Built with Next.js, Sanity CMS, Tailwind CSS, and multi-language support (English, Hindi, Marathi).

## 🚀 Features

- **Next.js 14** - React framework with App Router and SSG
- **Sanity CMS** - Headless content management system for easy content updates
- **Multi-language Support** - English, Hindi, and Marathi (i18n ready)
- **SEO Optimized** - Automatic sitemap, meta tags, structured data
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Photo Galleries** - Dedicated gallery system for trek photos
- **Trek Management** - Full CRUD for trekking programs with difficulty levels, pricing, itineraries
- **Testimonials** - Guest reviews and ratings system
- **Contact Form** - Inquiry and booking system

## 📁 Project Structure

```
ecoadv/
├── public/
│   └── locales/              # Translation files
│       ├── en.json
│       ├── hi.json
│       └── mr.json
├── sanity/
│   └── schemaTypes/          # Sanity content schemas
│       ├── trek.ts
│       ├── gallery.ts
│       ├── testimonial.ts
│       └── index.ts
├── src/
│   ├── app/
│   │   ├── [locale]/         # Locale-based routing
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── treks/
│   │   │   ├── gallery/
│   │   │   └── contact/
│   │   └── globals.css
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── Trek/
│   │   │   └── TrekCard.tsx
│   │   └── Gallery/
│   ├── lib/
│   │   ├── sanity.ts         # Sanity client configuration
│   │   └── i18n.ts           # i18n configuration
│   └── locales/              # JSON files location (alternative structure)
├── sanity.config.ts          # Sanity configuration
├── middleware.ts             # i18n middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ (20.20.2 or higher recommended)
- npm or yarn
- A Sanity account (free tier available at sanity.io)

### Step 1: Install Dependencies

```bash
cd ecoadv
npm install
```

### Step 2: Set Up Sanity Project

1. **Create a Sanity Account**
   - Visit [sanity.io](https://sanity.io)
   - Sign up for a free account

2. **Create a New Project**
   ```bash
   npx sanity@latest init
   ```
   - Select "Yes, create a new Sanity project"
   - Choose a project name
   - Select your dataset (e.g., "production")
   - Choose TypeScript
   - Confirm schema setup

3. **Get Your Project Credentials**
   - Copy your Project ID from the Sanity console
   - Generate an auth token from your API settings

### Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=v2024-06-07
SANITY_API_TOKEN=your_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/en` to see your site.

## 📝 Content Schema

### Trek Document
- Title, Slug, Description
- Featured Image
- Duration (days), Difficulty Level, Price
- Location, Highlights
- Day-wise Itinerary
- Status (upcoming, current, past)

### Gallery Document
- Title, Description
- Related Trek (reference)
- Photo Array (image, caption, photographer)

### Testimonial Document
- Guest Name, Rating (1-5)
- Related Trek Reference
- Comment/Review Text
- Guest Photo

## 🌍 Multi-language Support

The site supports three languages:
- **English** (en) - Default
- **Hindi** (hi)
- **Marathi** (mr)

Add new languages by:
1. Creating `public/locales/{language}.json`
2. Adding language code to `locales` array in `src/lib/i18n.ts`
3. Updating middleware configuration if needed

## 🎨 Design & Customization

### Colors
- Primary: Green (`#059669`)
- Secondary: White
- Accent: Gray

### Fonts
- Geist Sans (headings)
- Geist Mono (code)

### Styling
All styling uses Tailwind CSS. Customize in `tailwind.config.ts`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/ecoadv.git
git push -u origin main

# Then deploy from Vercel dashboard
# Add your environment variables in Vercel settings
```

### Other Hosting Options
- Netlify
- GitHub Pages
- AWS Amplify

## 🔍 SEO Features

✅ Automatic sitemap generation  
✅ Meta tags and Open Graph support  
✅ Structured data (Schema.org)  
✅ Mobile-responsive design  
✅ Fast Core Web Vitals  
✅ URL structure optimization  

## 📞 Contact & Support

For inquiries about trekking programs, contact through the website contact form.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for adventure enthusiasts**
