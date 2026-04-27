# Supabase Setup Guide

This guide will help you connect your own Supabase project to the InRevTech web app.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or log in
4. Click "New Project"
5. Fill in:
   - **Name**: inrevtech-web-app (or your preferred name)
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose the region closest to your users
6. Click "Create new project"
7. Wait for the project to be provisioned (1-2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Project Settings** > **API**
2. Copy the following values:
   - **Project URL**: Looks like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: A long JWT token

## Step 3: Run the Database Migration

The project includes a migration file to create the necessary tables.

### Option A: Using Supabase Dashboard (Recommended)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the contents of `supabase/migrations/20260417074852_create_inquiries_and_newsletter_tables.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the migration

### Option B: Using Supabase CLI

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_ID
   ```

4. Push the migration:
   ```bash
   supabase db push
   ```

## Step 4: Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Save the file

## Step 5: Verify the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Test the contact form to ensure data is being saved to Supabase:
   - Go to the Contact page
   - Fill out the form
   - Submit
   - Check your Supabase dashboard > Table Editor > `inquiries` table to see the submission

## Database Schema

The migration creates two tables:

### `inquiries`
Stores contact form and quote request submissions with fields:
- id, name, email, company, phone
- service, budget, timeline, message
- type (contact/quote), status (new/in_review/responded/closed)
- created_at, updated_at

### `newsletter_subscribers`
Stores newsletter subscribers with fields:
- id, email, name
- is_active, subscribed_at, unsubscribed_at

## Security

Row Level Security (RLS) is enabled:
- Anonymous users can INSERT into both tables (submit forms)
- No public SELECT/UPDATE/DELETE allowed
- Your backend can use the service_role key for admin operations

## Next Steps

- For production, add your Supabase environment variables to Vercel
- Consider adding authentication using Supabase Auth
- Set up Row Level Security policies for authenticated users
- Enable Supabase Realtime for live updates if needed
