-- Add subscription and trial fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS advocate_enrollment_number TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS trial_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS trial_used BOOLEAN DEFAULT FALSE;

-- Create subscription plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    price NUMERIC NOT NULL,
    duration_days INTEGER NOT NULL,
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default plans
INSERT INTO subscription_plans (name, price, duration_days, features)
VALUES
('Free', 0, 0, '{"basic_access": true}'),
('Pro', 999, 30, '{"advanced_reports": true, "gst_invoicing": true}'),
('Premium', 1999, 30, '{"all_features": true}')
ON CONFLICT (name) DO NOTHING;

-- Prevent duplicate enrollment numbers
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_enrollment
ON profiles (advocate_enrollment_number);