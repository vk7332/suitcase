import { supabase } from "@/utils/supabase/supabaseClient";

export async function searchClients(query: string) {
    const { data } = await supabase
        .from("clients")
        .select("*")
        .ilike("name", `%${query}%`);

    return data;
}

export async function searchCases(query: string) {
    const { data } = await supabase
        .from("cases")
        .select("*")
        .or(
            `case_title.ilike.%${query}%,case_number.ilike.%${query}%,court_name.ilike.%${query}%`
        );

    return data;
}


