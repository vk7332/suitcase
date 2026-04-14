// =====================================================
// SUITCASE - Razorpay Payment Link Service
// =====================================================

import axios from "axios";
import { updatePaymentLink } from "./invoiceService";

const API_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Generate Razorpay Payment Link
 */
export const generatePaymentLink = async (invoice) => {
    try {
        const response = await axios.post(
            `${API_URL}/create-payment-link`,
            {
                amount: invoice.amount,
                description: `Invoice ${invoice.invoice_number}`,
                customer: {
                    name: invoice.client_name,
                    email: invoice.client_email,
                    contact: invoice.client_phone,
                },
            }
        );

        const paymentLink = response.data.payment_link;

        // Save link in Supabase
        await updatePaymentLink(invoice.id, paymentLink);

        return paymentLink;
    } catch (error) {
        console.error("Error generating payment link:", error);
        throw error;
    }
};
