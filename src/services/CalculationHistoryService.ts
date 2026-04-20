import { supabase } from "../lib/supabaseClient";

export async function saveCalculation(data: any) {
    const { error } = await supabase
        .from("calculation_history")
        .insert([data]);

    if (error) {
        console.error("Save Error:", error);
    }
}

export async function getCalculations() {
    const { data, error } = await supabase
        .from("calculation_history")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Fetch Error:", error);
        return [];
    }

    return data;
}

export async function deleteCalculation(id: string) {
    await supabase
        .from("calculation_history")
        .delete()
        .eq("id", id);
}


