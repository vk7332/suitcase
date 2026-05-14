import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    console.error("VITE_SUPABASE_URL is missing or placeholder");
}

if (!supabaseAnonKey || supabaseAnonKey.includes("placeholder")) {
    console.error("VITE_SUPABASE_ANON_KEY is missing or placeholder");
}

export const supabase = createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-key"
);

export default supabase;
