import { supabase } from "@/utils/supabase/supabaseClient";

export async function getPayments(caseId: string) {
    const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("case_id", caseId)
        .order("payment_date", { ascending: false });

    if (error) console.error(error);
    return data;
}

export async function addPayment(payment: any) {
    const { error } = await supabase
        .from("payments")
        .insert([payment]);

    if (error) console.error(error);
}

export async function deletePayment(id: string) {
    const { error } = await supabase
        .from("payments")
        .delete()
        .eq("id", id);

    if (error) console.error(error);
}



