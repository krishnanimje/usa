# SEO & Launch Setup Guide - Corazon Air

This document provides instructions on how to set up, deploy, and maintain the SEO and performance of the Corazon Air website.

## A. Production Domain Configuration
1. Open your hosting provider's dashboard (e.g., Vercel, Netlify).
2. Go to the project settings and locate **Environment Variables**.
3. Set the `NEXT_PUBLIC_SITE_URL` to your production domain (e.g., `https://www.corazonair.com`). Ensure it includes `https://` and has NO trailing slash.
4. Redeploy the website to apply the URL to the sitemap, canonical tags, and structured data.

## B. Google Search Console Setup
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your website property using the **Domain** verification method.
3. Add the TXT record provided by Google to your DNS settings (e.g., in GoDaddy or Cloudflare).
4. Verify ownership.

## C. Sitemap Submission
1. In Google Search Console, navigate to **Sitemaps** on the left menu.
2. Enter `sitemap.xml` and click **Submit**.
3. Verify that the sitemap was processed successfully and that it only contains public pages (not the `/admin` pages).

## D. URL Inspection
1. Use the **URL Inspection** tool at the top of Google Search Console.
2. Enter your homepage URL: `https://www.corazonair.com/`.
3. Check if the page is indexed. If not, click **Request Indexing**.
4. Repeat this step for major service pages (e.g., `/services/ac-repair`).

## E. Google Business Profile Consistency
1. Ensure your Google Business Profile matches the exact business details in `src/data/config.ts`.
2. Name: "Corazon Air – Aire Acondicionado y Calefacción"
3. Address: "4397 W Bethany Home Rd #1081, Glendale, AZ 85301"
4. Phone: "(602) 428-3358"
5. Consistent NAP (Name, Address, Phone) is a strong ranking signal for Local SEO.

## F. Analytics Configuration
1. If you plan to use Google Analytics, set up a GA4 property.
2. Install the measurement ID (e.g., `G-XXXXXXXXXX`) into your Next.js application, preferably using `@next/third-parties/google`.
3. Ensure no extra tracking scripts slow down the `LCP` metric.

## G. Environment Variables
Your production environment must have these variables set securely (never expose secrets to the browser):
- `NEXT_PUBLIC_SITE_URL` (Required for SEO)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Secret - DO NOT share)
- `RESEND_API_KEY` (Secret - DO NOT share)
- `LEAD_NOTIFICATION_EMAIL` (E.g., admin@corazonair.com)

## H. Deployment Checklist
- [ ] Verify `NEXT_PUBLIC_SITE_URL` is set correctly.
- [ ] Verify database schema (RLS policies and tables) are pushed to Supabase.
- [ ] Run `npm run build` locally to ensure no build errors.
- [ ] Check `https://www.corazonair.com/robots.txt` after deployment.
- [ ] Check `https://www.corazonair.com/sitemap.xml` after deployment.

## I. How to Verify SEO After Deployment
1. Run a **Lighthouse Audit** (F12 > Lighthouse > Generate Report). Ensure SEO and Accessibility scores are near 100.
2. Go to Google's [Rich Results Test](https://search.google.com/test/rich-results) and input your homepage URL. Verify that "LocalBusiness" structured data is detected.
3. Open `https://www.corazonair.com/admin/login` and verify that the page contains `<meta name="robots" content="noindex, nofollow">` in the HTML source.
