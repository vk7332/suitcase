import webpush from "web-push";

let vapidConfigured = false;

const configureVapid = () => {
    if (vapidConfigured) return true;

    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
        return false;
    }

    webpush.setVapidDetails(
        process.env.VAPID_SUBJECT || "mailto:your@email.com",
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );

    vapidConfigured = true;
    return true;
};

export const sendPush = async (subscription: any, message: string) => {
    try {
        if (!configureVapid()) {
            throw new Error("VAPID keys are not configured");
        }

        await webpush.sendNotification(
            subscription,
            JSON.stringify({ title: "SUITCASE Alert", body: message })
        );
    } catch (err) {
        console.log("❌ Push failed");
    }
};
