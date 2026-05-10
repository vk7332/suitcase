import { supabase } from "@/utils/supabase/supabaseClient";

export async function getProfile(userId: string) {
    const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    return data;
}


