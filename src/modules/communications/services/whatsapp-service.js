export const sendInvoiceWhatsApp = (invoice) => {
    const phone = invoice.clients?.phone;

    const message = `Dear ${invoice.clients?.name},

Your invoice (${invoice.invoice_number}) of ₹${invoice.total_amount} has been generated.

Pay securely using the link below:
${invoice.razorpay_payment_link}

Regards,
VK Tax & Law Chamber`;

    const url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
};
