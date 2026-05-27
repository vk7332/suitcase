import { supabase } from "@/utils/supabase/supabase-client";

export async function getCauseList() {
    const { data } = await supabase
        .from("cause_list")
        .select("*")
        .order("cause_date", { ascending: true });

    return data;
}

export async function addCauseEntry(entry: any) {
    await supabase.from("cause_list").insert([entry]);
}

export async function deleteCauseEntry(id: string) {
    await supabase.from("cause_list").delete().eq("id", id);
}



