# Corazon Air – Premium HVAC Website & Admin Dashboard

A high-performance, production-ready website for Corazon Air, serving Glendale, Arizona, bundled with a secure, authenticated lead management dashboard.

## 🏗 Architecture
- **Framework:** Next.js (App Router)
- **Styling:** CSS Modules with Custom Properties (Native CSS, zero-bloat)
- **Rendering:** Static Site Generation (SSG) for all content pages
- **API:** Next.js Route Handlers for form submissions
- **Database:** Supabase (PostgreSQL) for lead management
- **Email:** Resend API for transactional owner notifications
- **Auth:** Supabase Auth with Server-Side Cookies (SSR)
- **Icons:** Lucide React

## 🚀 Setup & Localhost Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon public key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (For server-side DB inserts)
- `RESEND_API_KEY`: Resend API key for email notifications
- `LEAD_NOTIFICATION_EMAIL`: The business owner's email to receive alerts

### 3. Database Migration (Supabase)
1. Go to your Supabase project dashboard -> SQL Editor.
2. Copy the entire contents of `supabase/schema.sql` and run it.
3. This creates the `leads` and `lead_activities` tables, configures Row Level Security (RLS) policies, and creates indexes.

### 4. Create the First Admin User
1. Open your Supabase project dashboard -> Authentication.
2. Click **Add User** -> **Create New User**.
3. Enter the admin email and a secure password.
4. Disable "Auto Confirm User?" if you want them to confirm their email, or leave it enabled for instant access.
5. This user is automatically authorized to log into the dashboard because RLS policies allow authenticated reads/writes.

### 5. Start Development Server
```bash
npm run dev
```

### 6. Verify URLs
- **Public Website:** `http://localhost:3000/`
- **Admin Login:** `http://localhost:3000/admin/login`
- **Admin Dashboard:** `http://localhost:3000/admin/dashboard`

## 🔐 Security & Dashboard Features
- Secure headers via `next.config.ts`.
- Environment variables protect sensitive keys.
- **Supabase Row Level Security (RLS)** is strictly enforced. The client cannot read or modify the `leads` table.
- Dashboard routes (`/admin/*`) are protected by Next.js Middleware checking Supabase auth cookies.
- `/admin` is strictly disallowed in `robots.ts` and excluded from `sitemap.ts`.
- Form submissions are safe against double clicks and database operations are strictly separate from email dispatch (if email fails, the lead is still saved).

## 🚀 Deployment
Deploy effortlessly on Vercel or any Node.js hosting.
1. Add all environment variables from `.env.local` to your hosting provider's configuration.
2. Run `npm run build`
3. Run `npm run start` (or deploy via Git to Vercel).
