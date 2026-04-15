-- Create the client_records table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS client_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    pan TEXT,
    assessment_year TEXT,
    tax_regime TEXT,
    income_details JSONB,
    deductions JSONB,
    tax_liability JSONB,
    audit_report JSONB,
    pdf_data TEXT, -- Base64 encoded PDF
    last_calculated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_client_records_user_id ON client_records(user_id);
CREATE INDEX IF NOT EXISTS idx_client_records_last_calculated ON client_records(last_calculated DESC);
CREATE INDEX IF NOT EXISTS idx_client_records_pan ON client_records(pan);

-- Enable Row Level Security (RLS)
ALTER TABLE client_records ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only see their own records
CREATE POLICY "Users can view own client records" ON client_records
    FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own records
CREATE POLICY "Users can insert own client records" ON client_records
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own records
CREATE POLICY "Users can update own client records" ON client_records
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own records
CREATE POLICY "Users can delete own client records" ON client_records
    FOR DELETE USING (auth.uid() = user_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_client_records_updated_at
    BEFORE UPDATE ON client_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    create table calculation_history (
  id uuid primary key default uuid_generate_v4(),

  created_at timestamp with time zone default now(),

  state text,
  suit_amount numeric,
  defendants integer,

  court_fee numeric,
  filing_fee numeric,
  application_fee numeric,
  affidavit_fee numeric,
  process_fee numeric,
  vakalatnama_fee numeric,
  notary_fee numeric,

  advocate_fee numeric,
  misc_expenses numeric,

  total_cost numeric
);

create index idx_calculation_history_created_at on calculation_history(created_at desc);


CREATE TABLE IF NOT EXISTS client_ledgers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID,
    description TEXT,
    entry_type TEXT CHECK (entry_type IN ('credit', 'debit')),
    amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    balance NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE client_ledgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

create index idx_cases_client_id on cases(client_id);
create index idx_cases_filing_date on cases(filing_date);

-- Client Ledgers Policies
CREATE POLICY "Users can manage their client ledgers"
ON client_ledgers
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Invoice Policies
CREATE POLICY "Users can manage their invoices"
ON invoices
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

create table case_diary (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id),
  hearing_date date,
  stage text,
  notes text,
  next_date date
);
create index idx_case_diary_case_id on case_diary(case_id);
create index idx_case_diary_hearing_date on case_diary(hearing_date);   

create table case_calculations (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id),

  state text,
  suit_amount numeric,
  court_fee numeric,
  filing_fee numeric,
  application_fee numeric,
  affidavit_fee numeric,
  process_fee numeric,
  vakalatnama_fee numeric,
  notary_fee numeric,
  advocate_fee numeric,
  misc_expenses numeric,
  total_cost numeric,

  created_at timestamp default now()
);
create index idx_case_calculations_case_id on case_calculations(case_id);
create index idx_case_calculations_created_at on case_calculations(created_at desc);

create table payments (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id),
  amount numeric,
  payment_date date,
  payment_mode text,
  remarks text
);
create index idx_payments_case_id on payments(case_id);
create index idx_payments_payment_date on payments(payment_date);

create table cause_list (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id),
  cause_date date,
  item_no text,
  stage text,
  remarks text
);
create index idx_cause_list_case_id on cause_list(case_id);
create index idx_cause_list_cause_date on cause_list(cause_date);

create table drafts (
  id uuid primary key default uuid_generate_v4(),
  title text,
  category text,
  court text,
  content text,
  tags text,
  created_at timestamp default now()
);
create index idx_drafts_title on drafts(title);
create index idx_drafts_category on drafts(category);
create index idx_drafts_court on drafts(court);
create index idx_drafts_created_at on drafts(created_at desc);

create table limitation (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id),
  action text,
  start_date date,
  limitation_days int,
  last_date date,
  alert_days int default 7,
  created_at timestamp default now()
);
create index idx_limitation_case_id on limitation(case_id);
create index idx_limitation_last_date on limitation(last_date);

create table documents (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id),
  file_name text,
  file_url text,
  created_at timestamp default now()
);
create index idx_documents_case_id on documents(case_id);
create index idx_documents_file_name on documents(file_name);
create index idx_documents_created_at on documents(created_at desc);

create table ledger (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id),
  type text, -- credit / debit
  amount numeric,
  description text,
  created_at timestamp default now()
);
create index idx_ledger_client_id on ledger(client_id);
create index idx_ledger_created_at on ledger(created_at desc);

-- Removed redundant ALTER TABLE cases ADD COLUMN user_id statement (already defined or not needed)
-- Removed invalid index creation for user_id on cases (user_id does not exist in cases table)
-- Removed: alter table users add column role text default 'advocate'; Supabase uses auth.users, not a local users table.

-- Removed redundant ALTER TABLE cases ADD COLUMN status statement (already defined or not needed)
-- Removed redundant ALTER TABLE cases ADD COLUMN next_date statement (already defined or not needed)
-- Removed redundant ALTER TABLE cases ADD COLUMN state statement (already defined or not needed)
-- Removed redundant ALTER TABLE cases ADD COLUMN district statement (already defined or not needed)
-- Removed redundant ALTER TABLE cases ADD COLUMN court statement (already defined or not needed)
-- Removed redundant ALTER TABLE cases ADD COLUMN statements for columns already defined in CREATE TABLE cases.


create table case_timeline (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id),
  hearing_date date,
  notes text,
  next_date date,
  stage text,
  created_at timestamp default now()
);
create index idx_case_timeline_case_id on case_timeline(case_id);
create index idx_case_timeline_hearing_date on case_timeline(hearing_date);

-- Removed redundant ALTER TABLE clients ADD COLUMN email statement (already defined in CREATE TABLE clients)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS user_id uuid;
-- create index idx_clients_user_id on clients(user_id); -- Commented out to prevent error if column does not exist



create table invitations (
  id uuid primary key default gen_random_uuid(),
  email text,
  role text,
  invited_by uuid,
  status text default 'pending'
);
create index idx_invitations_email on invitations(email);

CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  feature TEXT NOT NULL,
  usage_date DATE DEFAULT CURRENT_DATE,
  count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_feature ON usage_logs(feature);
select * from usage_logs order by created_at desc;  

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  plan TEXT,
  amount NUMERIC,
  razorpay_payment_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_payments_user_id ON payments(user_id);
SELECT * FROM payments ORDER BY created_at DESC;

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    invoice_number TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    invoice_date DATE DEFAULT CURRENT_DATE,
    amount NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'Pending',
    razorpay_payment_link TEXT,
    payment_status TEXT DEFAULT 'Pending',
    gst_percentage NUMERIC(5,2) DEFAULT 18,
    gst_amount NUMERIC(10,2) DEFAULT 0,
    taxable_amount NUMERIC(10,2) DEFAULT 0,
    is_gst_applicable BOOLEAN DEFAULT TRUE,
    gst_number TEXT,
    place_of_supply TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_invoices_client_email ON invoices(client_email);
SELECT * FROM invoices ORDER BY created_at DESC;

ALTER TABLE invoices
DROP COLUMN IF EXISTS razorpay_payment_link;

ALTER TABLE invoices
ADD COLUMN razorpay_payment_link TEXT;

CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE IF NOT EXISTS referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT,
  reward_amount NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION increment_affiliate_earnings(
  affiliate_user_id UUID,
  commission_amount NUMERIC
)
RETURNS void AS $$
BEGIN
  UPDATE affiliates
  SET total_earnings = total_earnings + commission_amount
  WHERE user_id = affiliate_user_id;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE payout_requests
ADD COLUMN IF NOT EXISTS razorpay_payout_id TEXT,
ADD COLUMN IF NOT EXISTS payout_method TEXT,
ADD COLUMN IF NOT EXISTS account_number TEXT,
ADD COLUMN IF NOT EXISTS ifsc TEXT,
ADD COLUMN IF NOT EXISTS upi_id TEXT,
ADD COLUMN IF NOT EXISTS remarks TEXT,
ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  enrollment_number TEXT,
  chamber_name TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  logo_url TEXT,
  signature_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

alter table public.profiles add column role text;
alter table public.profiles add column is_active boolean default true;

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS referral_code TEXT,
ADD COLUMN IF NOT EXISTS referred_by TEXT;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

CREATE SEQUENCE invoice_seq START 1;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    seq_num INTEGER;
BEGIN
    seq_num := nextval('invoice_seq');
    RETURN 'SUI-' || EXTRACT(YEAR FROM CURRENT_DATE) || '-' ||
           LPAD(seq_num::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.invoice_number IS NULL THEN
        NEW.invoice_number := generate_invoice_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER invoice_number_trigger
BEFORE INSERT ON invoices
FOR EACH ROW
EXECUTE FUNCTION set_invoice_number();

CREATE TABLE client_ledgers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
    entry_date DATE DEFAULT CURRENT_DATE,
    description TEXT,
    debit NUMERIC(10,2) DEFAULT 0,
    credit NUMERIC(10,2) DEFAULT 0,
    balance NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_client_ledgers_client_id ON client_ledgers(client_id);
CREATE INDEX idx_client_ledgers_entry_date ON client_ledgers(entry_date DESC);
ALTER TABLE client_ledgers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their client ledgers"
ON client_ledgers
FOR ALL 
USING (auth.uid() IS NOT NULL);

ALTER TABLE invoices
ADD COLUMN razorpay_payment_link TEXT,
ADD COLUMN payment_status TEXT DEFAULT 'Pending',
ADD COLUMN razorpay_payment_id TEXT;

ALTER TABLE invoices
ADD COLUMN IF NOT EXISTS gst_percentage NUMERIC(5,2) DEFAULT 18,
ADD COLUMN IF NOT EXISTS gst_amount NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS taxable_amount NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_gst_applicable BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS gst_number TEXT,
ADD COLUMN IF NOT EXISTS place_of_supply TEXT;

CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'INV-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
           LPAD(NEXTVAL('invoice_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.invoice_number IS NULL THEN
        NEW.invoice_number := generate_invoice_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER invoice_number_trigger
BEFORE INSERT ON invoices
FOR EACH ROW
EXECUTE FUNCTION set_invoice_number();

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  full_name text,
  role text default 'public',
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;v

create policy "Users can view their own profile"
on profiles
for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on profiles
for update
using (auth.uid() = id);

create policy "Users can insert their own profile"
on profiles
for insert
with check (auth.uid() = id);

select * from profiles;

-- Affiliates Table
select * from affiliates;

-- Referrals Table
select * from referrals;

-- Payout Requests Table
select * from payout_requests;

