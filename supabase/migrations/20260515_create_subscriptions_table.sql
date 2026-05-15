-- Create subscriptions table (referenced by edge functions but missing)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT NOT NULL CHECK (plan IN ('FREE', 'PRO', 'PREMIUM', 'CHAMBER')),
    plan_type TEXT NOT NULL DEFAULT 'FREE', -- Alias for plan
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
    amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    razorpay_subscription_id TEXT UNIQUE,
    razorpay_payment_id TEXT,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON public.subscriptions(plan);
CREATE INDEX IF NOT EXISTS idx_subscriptions_razorpay_id ON public.subscriptions(razorpay_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON public.subscriptions(created_at DESC);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policy - users can only view their own subscriptions
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view their own subscriptions"
    ON public.subscriptions
    FOR SELECT
    USING (auth.uid() = user_id);

-- RLS Policy - only service role can insert/update subscriptions
DROP POLICY IF EXISTS "Service role manages subscriptions" ON public.subscriptions;
CREATE POLICY "Service role manages subscriptions"
    ON public.subscriptions
    FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Sync function: Update profiles subscription_plan when subscriptions table changes
CREATE OR REPLACE FUNCTION public.sync_subscription_to_profile()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET subscription_plan = NEW.plan_type
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to sync subscriptions to profiles
DROP TRIGGER IF EXISTS trg_sync_subscription ON public.subscriptions;
CREATE TRIGGER trg_sync_subscription
    AFTER INSERT OR UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_subscription_to_profile();
