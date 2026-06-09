import { supabase } from "@/utils/supabase/supabase-client";

export async function searchCases(
    query: string
) {
    if (!query.trim()) return [];

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("cases")
        .select(`
            id,
            case_title,
            case_number,
            court_name,
            status
        `)
        .eq("user_id", user.id)
        .or(`
            case_title.ilike.%${query}%,
            case_number.ilike.%${query}%,
            court_name.ilike.%${query}%
        `)
        .limit(10);

    if (error) throw error;

    return data || [];
}

export async function searchClients(
    query: string
) {
    if (!query.trim()) return [];

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("clients")
        .select(`
            id,
            client_name,
            phone_number,
            email
        `)
        .eq("user_id", user.id)
        .or(`
            client_name.ilike.%${query}%,
            phone_number.ilike.%${query}%,
            email.ilike.%${query}%
        `)
        .limit(10);

    if (error) throw error;

    return data || [];
}