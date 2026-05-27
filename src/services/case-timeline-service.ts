import { supabase } from "@/utils/supabase/supabase-client";

// 📥 Get timeline
export async function getTimeline(caseId: string) {
    const { data } = await supabase
        .from("case_timeline")
        .select("*")
        .eq("case_id", caseId)
        .order("hearing_date", { ascending: false });

    return data;
}

// ➕ Add entry
export async function addTimeline(entry: any) {
    await supabase.from("case_timeline").insert([entry]);
}

// ❌ Delete entry
export async function deleteTimeline(id: string) {
    await supabase
        .from("case_timeline")
        .delete()
        .eq("id", id);
}



