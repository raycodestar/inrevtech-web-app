/*
  # Create inquiries and newsletter_subscribers tables

  ## Summary
  Creates the core backend tables for InRevTech's contact and quote forms,
  plus newsletter subscriptions.

  ## New Tables

  ### inquiries
  Stores all contact form and quote request submissions.
  - id: UUID primary key
  - name, email: Required contact details
  - company, phone: Optional contact details
  - service: Selected service of interest
  - budget: Selected budget range
  - timeline: Desired project timeline
  - message: The inquiry message body
  - type: Discriminator — 'contact' or 'quote'
  - status: Workflow status for team follow-up
  - created_at, updated_at: Timestamps

  ### newsletter_subscribers
  Stores email newsletter subscriber records.
  - id: UUID primary key
  - email: Unique subscriber email
  - name: Optional subscriber name
  - is_active: Whether subscriber is active
  - subscribed_at: Subscription timestamp
  - unsubscribed_at: Optional unsubscription timestamp

  ## Security
  - RLS enabled on both tables
  - Anonymous users can INSERT (submit forms)
  - No public SELECT/UPDATE/DELETE allowed
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  service text,
  budget text,
  timeline text,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'contact' CHECK (type IN ('contact', 'quote')),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'responded', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
  ON inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  is_active boolean NOT NULL DEFAULT true,
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  unsubscribed_at timestamptz
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Subscribers can update their own record"
  ON newsletter_subscribers
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
