import axios from "axios";

export async function sendWhatsAppAPI({
    to,
    message,
}: any) {
    try {
        await axios.post(
            "https://api.twilio.com/2010-04-01/Accounts/YOUR_SID/Messages.json",
            new URLSearchParams({
                To: `whatsapp:+91${to}`,
                From: "whatsapp:+14155238886", // Twilio sandbox
                Body: message,
            }),
            {
                auth: {
                    username: "YOUR_SID",
                    password: "YOUR_AUTH_TOKEN",
                },
            }
        );
    } catch (err) {
        console.error(err);
        alert("WhatsApp sending failed");
    }
}

export const WhatsAppService = {
    sendWhatsAppAPI,
    sendWhatsAppInvoice: async (invoice: any) => {
        const message = `Hello, your invoice ${invoice.invoice_number} for ₹${invoice.total_amount} is ready.`;
        await sendWhatsAppAPI({ to: invoice.client?.phone || "", message });
    }
};


