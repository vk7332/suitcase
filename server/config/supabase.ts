import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    'SUPABASE_URL missing in .env'
  );
}

if (!supabaseKey) {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY missing in .env'
  );
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