import { supabase } from "../config/supabase";
import { sendInvoiceEmail } from "./email.service";
import { sendSMS as sendSMSClient } from "./sms.service";
import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);

export const sendSMS = async (to: string, message: string) => {
    try {
        await sendSMSClient(to, message);
        console.log("📩 SMS sent:", to);
    } catch (err) {
        const messageText = err instanceof Error ? err.message : String(err);
        console.log("❌ SMS failed:", messageText);
    }
};

export const sendWhatsApp = async (
    to: string,
    message: string
) => {
    try {
        await client.messages.create({
            body: message,
            from: "whatsapp:" + process.env.TWILIO_PHONE,
            to: "whatsapp:" + to,
        });

        console.log("💬 WhatsApp sent:", to);
    } catch (err) {
        const messageText = err instanceof Error ? err.message : String(err);
        console.log("❌ WhatsApp failed:", messageText);
    }
};

// 🔍 fallback fetch
const getUserContact = async (user_id: string) => {
    const { data, error } = await supabase
        .from("users")
        .select("email, phone")
        .eq("id", user_id)
        .single();

    if (error) return null;

    return data;
};

// 🔔 main notification
export const sendNotification = async ({
    user_id,
    email,
    phone,
    message,
}: any) => {
    try {
        // 1️⃣ fallback if missing
        if (!email || !phone) {
            const user = await getUserContact(user_id);

            email = email || user?.email;
            phone = phone || user?.phone;
        }

        // 2️⃣ in-app (ALWAYS)
        await supabase.from("notifications").insert([
            {
                user_id,
                message,
                read: false,
            },
        ]);


        // 3️⃣ email (safe)
        if (email) {
            try {
                // server/services/notification.service.ts

                try {
                    await sendInvoiceEmail(email, message);
                } catch (err) {
                    console.error("email failed:", err);

                    // ✅ ADD HERE
                    await supabase.from("notification_logs").insert([
                        {
                            user_id,
                            type: "email",
                            status: "failed",
                            error: String(err),
                        },
                    ]);
                }

                // 4️⃣ sms (safe)
                if (phone) {
                    try {
                        await sendSMS(phone, message);
                    } catch (err) {
                        console.error("sms failed:", err);

                        await supabase.from("notification_logs").insert([
                            {
                                user_id,
                                type: "sms",
                                status: "failed",
                                error: String(err),
                            },
                        ]);
                    }
                }
            }

            catch (err) {
                console.error("notification failed:", err);

                await supabase.from("notification_logs").insert([
                    {
                        user_id,
                        type: "system",
                        status: "failed",
                        error: String(err),
                    },
                ]);
            }
        }
    } catch (err) {
        console.error("unexpected error in sendNotification:", err);
    }
};

type SignerInfo = {
    user_id: string;
};

const getNextSigner = async (document_id: string): Promise<SignerInfo | null> => {
    // Placeholder until signer service is available
    return null;
};

export const notifyNextSigner = async (document_id: string) => {
    const next = await getNextSigner(document_id);

    if (!next) return;

    // send email / SMS
    console.log(`Notify ${next.user_id} to sign`);
};