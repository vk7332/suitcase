import { supabase } from "../../../lib/supabaseClient";

export const generatePaymentLink = async (invoice) => {
    try {
        const { data, error } = await supabase.functions.invoke(
            "create-payment-link",
            {
                body: {
                    amount: invoice.total_amount,
                    description: `Invoice ${invoice.invoice_number}`,
                    customer: {
                        name: invoice.clients?.name || "Client",
                        email: invoice.clients?.email || "client@example.com",
                        contact: invoice.clients?.phone || "9999999999"
                    }
                }
            }
        );

        if (error) throw error;

        const paymentLink = data.short_url;

        // Update invoice with payment link
        await supabase
            .from("invoices")
            .update({
                razorpay_payment_link: paymentLink,
                payment_status: "Pending"
            })
            .eq("id", invoice.id);

        return paymentLink;
    } catch (err) {
        console.error("Error generating payment link:", err);
        return null;
    }
};
