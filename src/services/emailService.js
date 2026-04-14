import emailjs from "emailjs-com";

export const sendInvoiceEmail = async (invoice) => {
    const templateParams = {
        to_name: invoice.client_name,
        to_email: invoice.client_email,
        invoice_number: invoice.invoice_number,
        amount: invoice.amount,
        payment_link: invoice.razorpay_payment_link,
    };

    return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
}; s