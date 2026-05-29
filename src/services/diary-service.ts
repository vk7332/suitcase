import { supabase } from "@/utils/supabase/supabase-client";

export async function getDiary(caseId: string) {
    const { data } = await supabase
        .from("case_diary")
        .select("*")
        .eq("case_id", caseId)
        .order("hearing_date", { ascending: false });

    return data;
}

export async function addDiary(entry: any) {
    await supabase.from("case_diary").insert([entry]);
}

export async function deleteDiary(id: string) {
    await supabase
        .from("case_diary")
        .delete()
        .eq("id", id);
}



