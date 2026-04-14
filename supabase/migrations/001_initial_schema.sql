-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
email TEXT,
phone TEXT,
address TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
invoice_number TEXT UNIQUE NOT NULL,
client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
amount NUMERIC NOT NULL,
gst_amount NUMERIC DEFAULT 0,
total_amount NUMERIC NOT NULL,
status TEXT DEFAULT 'Pending',
issue_date DATE DEFAULT CURRENT_DATE,
due_date DATE,
notes TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
amount NUMERIC NOT NULL,
method TEXT,
status TEXT,
transaction_id TEXT
);
