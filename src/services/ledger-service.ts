import { supabase } from "@/utils/supabase/supabase-client";

export async function getLedger(clientId: string) {
    const { data } = await supabase
        .from("ledger")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });

    return data;
}

export async function addLedger(entry: any) {
    await supabase.from("ledger").insert([entry]);
}

export const recordPayment = async (
    clientId: string,
    amount: number,
    description: string
) => {
    const { error } = await supabase.from("ledger_entries").insert({
        client_id: clientId,
        entry_date: new Date().toISOString(),
        description,
        debit: 0,
        credit: amount,
    });

    if (error) throw error;
};



