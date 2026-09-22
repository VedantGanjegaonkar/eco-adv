# 🚀 EcoAdventures Project Setup Guide

## ✅ What's Already Set Up

Your Next.js + Sanity CMS tourism website is ready! Here's what's included:

### Core Setup
- ✅ Next.js 14 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS for styling
- ✅ Sanity CMS configuration
- ✅ Multi-language support (i18n) - English, Hindi, Marathi
- ✅ Responsive design with mobile menu
- ✅ Header, Footer, and basic pages

### Pages Ready
- ✅ Home page with hero section and features
- ✅ Treks listing page (with sample data)
- ✅ Photo gallery page
- ✅ Contact form page

### Content Schemas Ready
- ✅ Trek/Program schema (with itinerary support)
- ✅ Gallery schema (with multiple photos)
- ✅ Testimonials schema (with ratings)

## 🔧 Next Steps to Get Running

### 1. Create Sanity Project

```bash
# In your project directory
npx sanity@latest init
```

Follow the prompts:
- Project name: `ecoadv` (or your choice)
- Use default dataset: `production`
- Choose TypeScript: Yes
- Accept default file structure

### 2. Get Sanity Credentials

After creating the project:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** tab
4. Copy your **Project ID**
5. Go to **Tokens** → Create new token → Name it `development`
6. Select: **Editor** scope
7. Copy the token

### 3. Update Environment Variables

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_from_sanity
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=v2024-06-07
SANITY_API_TOKEN=your_api_token_from_sanity
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Copy Sanity Schemas

Copy the schema files from `sanity/schemaTypes/` to your Sanity project's `schemas/` directory.

### 5. Start Development

```bash
# Terminal 1 - Next.js dev server
npm run dev

# Terminal 2 - Sanity studio (if you created it)
cd sanity
npm run dev
```

Visit:
- **Site**: http://localhost:3000/en
- **Sanity Studio**: http://localhost:3333 (if configured)

## 📦 Project Structure Summary

```
src/
├── app/[locale]/           # Locale-based routing (en, hi, mr)
│   ├── page.tsx           # Home page
│   ├── treks/page.tsx     # Treks listing
│   ├── gallery/page.tsx   # Photo gallery
│   └── contact/page.tsx   # Contact form
│
├── components/
│   ├── Common/
│   │   ├── Header.tsx     # Navigation header
│   │   └── Footer.tsx     # Footer with links
│   ├── Trek/
│   │   └── TrekCard.tsx   # Trek card component
│   └── Gallery/           # (Ready for components)
│
└── lib/
    ├── sanity.ts          # Sanity client config
    └── i18n.ts            # i18n configuration
```

## 🎨 Design Integration Notes

When you're ready with your Claude design handoff:

1. **Colors & Typography**
   - Update `tailwind.config.ts` with design colors
   - Update font imports in `src/app/[locale]/layout.tsx`

2. **Hero Section**
   - Modify `src/app/[locale]/page.tsx` hero section
   - Add background images/gradients as needed

3. **Component Styling**
   - Update `TrekCard.tsx` for design-specific card layouts
   - Customize `Header.tsx` branding and navigation

4. **Pages**
   - Each page can be individually styled
   - Maintain the i18n structure for multi-language support

## 📝 Adding Content to Sanity

Once your Sanity Studio is running:

1. Go to **Trek** section
2. Create new trek documents with:
   - Title, location, price
   - Images for featured photo
   - Itinerary (day by day)
   - Status (upcoming/current/past)

3. Go to **Photo Gallery**
   - Create gallery collections
   - Upload multiple photos
   - Link to related treks

4. Go to **Testimonials**
   - Add guest reviews
   - Include ratings and photos

## 🚀 Deploying to Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "EcoAdventures tourism website"
git push origin main

# Deploy from Vercel Dashboard
# 1. Import your GitHub repo
# 2. Add environment variables in settings
# 3. Deploy!
```

## 🌍 Multi-Language Support

Content is stored in JSON files in `public/locales/`:
- `en.json` - English
- `hi.json` - Hindi
- `mr.json` - Marathi

To add more languages:
1. Create `public/locales/[lang].json`
2. Add to `locales` array in `src/lib/i18n.ts`
3. Add translations for all keys

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [next-intl](https://next-intl-docs.vercel.app/)

## 💡 Tips

- Use Sanity's GROQ query language to fetch data
- Images from Sanity are auto-optimized via Sanity Image API
- SEO meta tags are in `src/app/[locale]/layout.tsx`
- Mobile menu is responsive and auto-collapses on desktop

## ❓ Common Issues

### "Project ID not found"
- Check `.env.local` has correct credentials
- Make sure `NEXT_PUBLIC_` prefix is used for frontend variables

### Sanity connection errors
- Verify internet connection
- Check API token has correct permissions
- Make sure dataset name matches (usually "production")

### i18n not working
- Clear browser cache
- Check URL structure: `http://localhost:3000/en` (includes locale)
- Verify locale files exist in `public/locales/`

---

**Ready for your design handoff! Once you provide the Claude design, I can implement all the styling and UI changes.** 🎨
