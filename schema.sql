-- Schema for Smart Flask Database
-- Run this in your Supabase SQL Editor

-- 1. Users / Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Reactions / Experiments Table
CREATE TABLE IF NOT EXISTS public.reactions (
    id text PRIMARY KEY,
    name text NOT NULL,
    formula text NOT NULL,
    category text NOT NULL,
    theory text NOT NULL,
    chemicals jsonb NOT NULL DEFAULT '[]',
    steps jsonb NOT NULL DEFAULT '[]',
    expected_outputs jsonb NOT NULL DEFAULT '[]',
    thumbnail_color text NOT NULL,
    difficulty text NOT NULL,
    duration_minutes integer NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Experiment Results Table
CREATE TABLE IF NOT EXISTS public.experiment_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT, -- Note: currently we pass email from frontend AuthContext
    reaction_id TEXT REFERENCES public.reactions(id) ON DELETE CASCADE,
    data jsonb NOT NULL DEFAULT '[]',
    is_public boolean DEFAULT false,
    total_duration_seconds integer NOT NULL,
    step_timings jsonb NOT NULL DEFAULT '[]',
    notes text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: Since the UI frontend was using "user_id: user?.email || null", 
-- we set user_id as TEXT. If you want to use Supabase Auth and proper UUIDs later,
-- you can change user_id to UUID and reference auth.users(id).

-- Optional: Enable Row Level Security (RLS) if required for public sharing
ALTER TABLE public.experiment_results ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts / reads for testing
CREATE POLICY "Allow public read of public results" ON public.experiment_results
    FOR SELECT USING (is_public = true);

CREATE POLICY "Allow anon insert to results" ON public.experiment_results
    FOR INSERT WITH CHECK (true);

-- (If you want open access for now)
CREATE POLICY "Allow all actions on results" ON public.experiment_results
    FOR ALL USING (true) WITH CHECK (true);
