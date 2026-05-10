import { supabase } from "@/utils/supabase/supabaseClient";

export async function getCases(userId: string) {
    const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return [];
    }
    return data;
}

export async function addCase(caseData: any) {
    const { error } = await supabase
        .from("cases")
        .insert([caseData]);

    if (error) console.log(error);
}

export async function updateCase(id: string, caseData: any) {
    const { error } = await supabase
        .from("cases")
        .update(caseData)
        .eq("id", id);

    if (error) console.log(error);
}

export async function deleteCase(id: string) {
    const { error } = await supabase
        .from("cases")
        .delete()
        .eq("id", id);

    if (error) console.log(error);
}


