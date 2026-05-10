import { createClient } from "@supabase/supabase-js";

console.log("Initializing Supabase Client...");

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

console.log("Supabase URL:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
