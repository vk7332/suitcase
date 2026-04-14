export const sendWhatsAppInvoice = (invoice) => {
    const message = `Dear ${invoice.client_name},

Your invoice (${invoice.invoice_number}) of ₹${invoice.amount} is ready.

Payment Link:
${invoice.razorpay_payment_link}

Thank you,
VK Tax & Law Chamber®`;

    const phone = invoice.client_phone.replace(/\D/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
};
