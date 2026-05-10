import { supabase } from "@/utils/supabase/supabaseClient";

export async function getDrafts() {
    const { data } = await supabase.from("drafts").select("*");
    return data;
}

export async function addDraft(draft: any) {
    await supabase.from("drafts").insert([draft]);
}

export async function deleteDraft(id: string) {
    await supabase.from("drafts").delete().eq("id", id);
}



