import emailjs from "emailjs-com";

export const sendInvoiceEmail = async (invoice) => {
    const templateParams = {
        to_name: invoice.clients?.name,
        to_email: invoice.clients?.email,
        invoice_number: invoice.invoice_number,
        amount: invoice.total_amount,
        payment_link: invoice.razorpay_payment_link,
    };

    try {
        const response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        return response;
    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
};
