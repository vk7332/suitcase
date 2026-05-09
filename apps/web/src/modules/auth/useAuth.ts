import { supabase } from '@/lib/supabase';

export async function signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
}