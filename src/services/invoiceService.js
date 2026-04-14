// =====================================================
// SUITCASE - Invoice Service
// Handles CRUD operations for invoices using Supabase
// =====================================================

import { supabase } from "./supabaseClient";

/**
 * Fetch all invoices for the logged-in user
 */
export const getInvoices = async () => {
    try {
        const { data, error } = await supabase
            .from("invoices")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching invoices:", error.message);
        return [];
    }
};

/**
 * Fetch a single invoice by ID
 */
export const getInvoiceById = async (id) => {
    try {
        const { data, error } = await supabase
            .from("invoices")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching invoice:", error.message);
        return null;
    }
};

/**
 * Create a new invoice
 */
export const createInvoice = async (invoiceData) => {
    try {
        // Get logged-in user
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("User not authenticated");

        const payload = {
            ...invoiceData,
            user_id: user.id,
        };

        const { data, error } = await supabase
            .from("invoices")
            .insert([payload])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error creating invoice:", error.message);
        return null;
    }
};

/**
 * Update an existing invoice
 */
export const updateInvoice = async (id, updatedData) => {
    try {
        const { data, error } = await supabase
            .from("invoices")
            .update(updatedData)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error updating invoice:", error.message);
        return null;
    }
};

/**
 * Delete an invoice
 */
export const deleteInvoice = async (id) => {
    try {
        const { error } = await supabase
            .from("invoices")
            .delete()
            .eq("id", id);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Error deleting invoice:", error.message);
        return false;
    }
};

/**
 * Update Razorpay payment link
 */
export const updatePaymentLink = async (id, paymentLink) => {
    try {
        const { data, error } = await supabase
            .from("invoices")
            .update({
                razorpay_payment_link: paymentLink,
            })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error updating payment link:", error.message);
        return null;
    }
};

/**
 * Mark invoice as paid
 */
export const markInvoiceAsPaid = async (id, paymentId) => {
    try {
        const { data, error } = await supabase
            .from("invoices")
            .update({
                payment_status: "Paid",
                status: "Paid",
                razorpay_payment_id: paymentId,
            })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error updating payment status:", error.message);
        return null;
    }
};

/**
 * Generate GST Report
 */
export const getGSTReport = async () => {
    try {
        const { data, error } = await supabase
            .from("invoices")
            .select("invoice_date, invoice_number, client_name, gst_amount, taxable_amount, amount")
            .eq("is_gst_applicable", true)
            .order("invoice_date", { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching GST report:", error.message);
        return [];
    }
};

/**
 * Generate Income Report
 */
export const getIncomeReport = async () => {
    try {
        const { data, error } = await supabase
            .from("invoices")
            .select("invoice_date, invoice_number, client_name, amount, payment_status")
            .eq("payment_status", "Paid")
            .order("invoice_date", { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching income report:", error.message);
        return [];
    }
};