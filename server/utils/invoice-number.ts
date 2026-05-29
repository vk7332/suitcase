import { supabase } from "../config/supabase";
import { getFinancialYear } from "./financial-year";

// 🔹 core RPC call
const getInvoiceNumberRpc = async (
    chamber_id: string,
    fy: string
) => {
    const { data, error } = await supabase.rpc(
        "get_next_invoice_number",
        {
            p_chamber_id: chamber_id,
            p_financial_year: fy,
        }
    );

    if (error) throw error;

    return data;
};

// 🔒 retry wrapper
export const generateSequentialInvoiceNumber = async (
    chamber_id: string
) => {
    const fy = getFinancialYear();

    for (let i = 0; i < 3; i++) {
        try {
            return await getInvoiceNumberRpc(chamber_id, fy);
        } catch (err) {
            if (i === 2) {
                throw new Error("invoice number generation failed");
            }
        }
    }
};