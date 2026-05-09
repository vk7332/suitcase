import webpush from "web-push";

webpush.setVapidDetails(
    "mailto:your@email.com",
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

export const sendPush = async (subscription: any, message: string) => {
    try {
        await webpush.sendNotification(
            subscription,
            JSON.stringify({ title: "SUITCASE Alert", body: message })
        );
    } catch (err) {
        console.log("❌ Push failed");
    }
};