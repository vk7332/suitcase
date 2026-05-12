import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ CRITICAL: SUPABASE_URL is missing. Make sure to set it in Railway Variables.');
  throw new Error('SUPABASE_URL missing');
}

if (!supabaseKey) {
  console.error('❌ CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing. Make sure to set it in Railway Variables.');
  throw new Error('SUPABASE_SERVICE_ROLE_KEY missing');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    realtime: {
      transport: WebSocket as any
    }
  }
);

export const supabaseAdmin = supabase;