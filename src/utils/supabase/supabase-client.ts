import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    console.error("VITE_SUPABASE_URL is missing or placeholder");
}

if (!supabaseAnonKey || supabaseAnonKey.includes("placeholder")) {
    console.error("VITE_SUPABASE_ANON_KEY is missing or placeholder");
}

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder") || supabaseAnonKey.includes("placeholder")) {
    throw new Error(
        "Missing Supabase client env variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env."
    );
}

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);

export default supabase;
