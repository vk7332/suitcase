import { supabase } from "../lib/supabaseClient";

export async function getLimitations() {
    const { data } = await supabase
        .from("limitation")
        .select("*");

    return data;
}

export async function addLimitation(entry: any) {
    await supabase.from("limitation").insert([entry]);
}

export async function deleteLimitation(id: string) {
    await supabase
        .from("limitation")
        .delete()
        .eq("id", id);
}
