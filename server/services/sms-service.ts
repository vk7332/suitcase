import twilio from "twilio";

const getClient = () => {
    const sid = process.env.TWILIO_SID || process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;

    if (!sid || !token || !process.env.TWILIO_PHONE) {
        throw new Error("Twilio SMS credentials are not configured");
    }

    return twilio(sid, token);
};

export const sendSMS = async (to: string, message: string) => {
    const client = getClient();

    await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE!,
        to,
    });
};
