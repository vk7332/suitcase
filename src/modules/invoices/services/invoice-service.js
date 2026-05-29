import { supabase } from "../../../lib/supabaseClient";

// Fetch all invoices
export const getInvoices = async () => {
    const { data, error } = await supabase
        .from("invoices")
        .select("*, clients(name)")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching invoices:", error);
        return [];
    }

    return data;
};

// Create a new invoice
export const createInvoice = async (invoiceData) => {
    const { data, error } = await supabase
        .from("invoices")
        .insert([invoiceData])
        .select();

    if (error) {
        console.error("Error creating invoice:", error);
        return null;
    }

    return data;
};
