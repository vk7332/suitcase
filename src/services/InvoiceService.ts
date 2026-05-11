import { supabase } from "@/utils/supabase/supabaseClient";
import { InvoiceData } from "../types/invoice";

export const generateInvoiceNumber = (): string => {
    const date = new Date();
    return `INV-${date.getFullYear()}${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${Date.now()}`;
};

export const fetchInvoices = async (): Promise<InvoiceData[]> => {
    const { data, error } = await supabase
        .from("invoices")
        .select("*, client:client_id(name, address, gstin)")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return [];
    }

    return data;
};

export const fetchGSTSummary = async () => {
    const { data, error } = await supabase.from("invoices").select("*");

    if (error) {
        console.error(error);
        return null;
    }

    const summary = data.reduce(
        (acc: any, invoice: any) => {
            acc.totalInvoices += 1;
            acc.taxableAmount += Number(invoice.amount);
            acc.gstCollected += Number(invoice.gst_amount);
            acc.totalRevenue += Number(invoice.total_amount);
            return acc;
        },
        {
            totalInvoices: 0,
            taxableAmount: 0,
            gstCollected: 0,
            totalRevenue: 0,
        }
    );

    return summary;
};


export const saveInvoice = async (invoice: InvoiceData) => {
    const { data, error } = await supabase
        .from("invoices")
        .insert({
            invoice_number: invoice.invoice_number,
            invoice_date: invoice.invoice_date,
            client_id: invoice.client_id,
            invoice_type: invoice.invoice_type,
            place_of_supply: invoice.place_of_supply,
            subtotal: invoice.subtotal,
            gst_amount: invoice.gst_amount,
            total_amount: invoice.total_amount,
            notes: invoice.notes,
        })
        .select()
        .single();

    if (error) throw error;

    const invoiceId = data.id;

    const itemsPayload = invoice.items.map((item) => ({
        invoice_id: invoiceId,
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.quantity * item.rate,
    }));

    const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsPayload);

    if (itemsError) throw itemsError;

    return data;
};

export const createInvoice = async (invoiceData: any) => {
    const { data, error } = await supabase
        .from("invoices")
        .insert(invoiceData)
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const updateInvoice = async (id: string, invoiceData: any) => {
    const { data, error } = await supabase
        .from("invoices")
        .update(invoiceData)
        .eq("id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const deleteInvoice = async (id: string) => {
    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (error) throw error;
    return true;
};


