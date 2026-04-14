import { supabase } from "../../../lib/supabaseClient";

// Fetch GST Report
export const fetchGSTReport = async (startDate, endDate) => {
    const { data, error } = await supabase
        .from("invoices")
        .select(`
      invoice_number,
      issue_date,
      clients(name, gst_number),
      taxable_amount,
      gst_percentage,
      gst_amount,
      total_amount,
      is_gst_applicable,
      place_of_supply
    `)
        .gte("issue_date", startDate)
        .lte("issue_date", endDate)
        .order("issue_date", { ascending: false });

    if (error) {
        console.error("Error fetching GST report:", error);
        return [];
    }

    return data;
};

// Fetch Income Report
export const fetchIncomeReport = async (startDate, endDate) => {
    const { data, error } = await supabase
        .from("invoices")
        .select(`
      invoice_number,
      issue_date,
      clients(name),
      total_amount,
      payment_status
    `)
        .gte("issue_date", startDate)
        .lte("issue_date", endDate)
        .order("issue_date", { ascending: false });

    if (error) {
        console.error("Error fetching income report:", error);
        return [];
    }

    return data;
};
