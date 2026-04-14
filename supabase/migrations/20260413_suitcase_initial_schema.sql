-- =====================================================
-- SUITCASE – Initial Supabase Database Schema
-- A Complete Office Suite for Advocates
-- Developed by VK Tax & Law Chamber®
-- =====================================================

-- Enable required extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. CLIENT LEDGERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.client_ledgers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID,
    description TEXT,
    entry_type TEXT CHECK (entry_type IN ('credit', 'debit')),
    amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    balance NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_client_ledgers_user_id
    ON public.client_ledgers(user_id);

CREATE INDEX IF NOT EXISTS idx_client_ledgers_client_id
    ON public.client_ledgers(client_id);

CREATE INDEX IF NOT EXISTS idx_client_ledgers_entry_date
    ON public.client_ledgers(entry_date DESC);

-- =====================================================
-- 2. INVOICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    invoice_number TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT,
    description TEXT,
    invoice_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'Pending',

    -- Razorpay Integration
    razorpay_payment_link TEXT,
    razorpay_payment_id TEXT,
    payment_status TEXT DEFAULT 'Pending',

    -- GST Details
    gst_percentage NUMERIC(5,2) DEFAULT 18,
    gst_amount NUMERIC(10,2) DEFAULT 0,
    taxable_amount NUMERIC(10,2) DEFAULT 0,
    is_gst_applicable BOOLEAN DEFAULT TRUE,
    gst_number TEXT,
    place_of_supply TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_invoices_user_id
    ON public.invoices(user_id);

CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number
    ON public.invoices(invoice_number);

-- =====================================================
-- 3. AUTO INVOICE NUMBER GENERATION
-- =====================================================
CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    new_number TEXT;
BEGIN
    new_number := 'INV-' ||
                  TO_CHAR(NOW(), 'YYYY') || '-' ||
                  LPAD(NEXTVAL('invoice_number_seq')::TEXT, 4, '0');
    RETURN new_number;
END;
$$;

-- Trigger Function
CREATE OR REPLACE FUNCTION public.set_invoice_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
        NEW.invoice_number := public.generate_invoice_number();
    END IF;
    RETURN NEW;
END;
$$;

-- Attach Trigger
DROP TRIGGER IF EXISTS trg_set_invoice_number ON public.invoices;

CREATE TRIGGER trg_set_invoice_number
BEFORE INSERT ON public.invoices
FOR EACH ROW
EXECUTE FUNCTION public.set_invoice_number();

-- =====================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.client_ledgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. RLS POLICIES
-- =====================================================

-- CLIENT LEDGERS POLICIES
DROP POLICY IF EXISTS "Users can manage their client ledgers"
ON public.client_ledgers;

CREATE POLICY "Users can manage their client ledgers"
ON public.client_ledgers
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- INVOICES POLICIES
DROP POLICY IF EXISTS "Users can manage their invoices"
ON public.invoices;

CREATE POLICY "Users can manage their invoices"
ON public.invoices
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 6. UPDATE TIMESTAMP FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. OPTIONAL: SAMPLE DATA (FOR TESTING)
-- =====================================================
-- Uncomment after logging into Supabase Auth

/*
INSERT INTO public.invoices (
    user_id,
    client_name,
    amount,
    taxable_amount,
    gst_amount,
    payment_status
)
VALUES (
    auth.uid(),
    'Test Client',
    1180,
    1000,
    180,
    'Pending'
);
*/

-- =====================================================
-- END OF MIGRATION
-- =====================================================