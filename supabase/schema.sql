-- Supabase Schema for Corazon Air Leads
-- Run this in the Supabase SQL Editor to set up the database

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    city TEXT,
    zip TEXT,
    state TEXT,
    service TEXT NOT NULL,
    contact_method TEXT,
    preferred_date TEXT,
    preferred_time TEXT,
    urgency TEXT,
    message TEXT,
    status TEXT DEFAULT 'NEW'::text,
    photo_url TEXT,
    source TEXT,
    assigned_to UUID,
    internal_notes TEXT
);

CREATE TABLE IF NOT EXISTS public.lead_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    activity_type TEXT NOT NULL,
    note TEXT,
    created_by UUID
);

-- Secure the tables with Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;

-- Allow insert access for anon role to leads (client-side submission if needed, though we use Service Role in API)
CREATE POLICY "Allow public inserts" ON public.leads FOR INSERT WITH CHECK (true);

-- Allow full access to leads for authenticated admin users
CREATE POLICY "Allow authenticated read leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update leads" ON public.leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete leads" ON public.leads FOR DELETE TO authenticated USING (true);

-- Allow full access to lead activities for authenticated admin users
CREATE POLICY "Allow authenticated read activities" ON public.lead_activities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert activities" ON public.lead_activities FOR INSERT TO authenticated WITH CHECK (true);

-- Create an index on status for faster filtering in the admin panel
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);
CREATE INDEX IF NOT EXISTS leads_phone_idx ON public.leads (phone);
CREATE INDEX IF NOT EXISTS leads_service_idx ON public.leads (service);

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
