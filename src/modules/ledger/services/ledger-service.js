import { supabase } from "../../../lib/supabaseClient";

// Fetch ledger entries by client
export const getClientLedger = async (clientId) => {
    const { data, error } = await supabase
        .from("client_ledgers")
        .select("*")
        .eq("client_id", clientId)
        .order("entry_date", { ascending: true });

    if (error) {
        console.error("Error fetching ledger:", error);
        return [];
    }

    return data;
};

// Add ledger entry
export const addLedgerEntry = async (entry) => {
    const { data, error } = await supabase
        .from("client_ledgers")
        .insert([entry])
        .select();

    if (error) {
        console.error("Error adding ledger entry:", error);
        return null;
    }

    return data;
};
