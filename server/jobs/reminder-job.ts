import cron from "node-cron";
import { supabase } from "../config/supabase.js";
import { sendSMS, sendWhatsApp } from "../services/notification-service.js";
import { sendPush } from "../services/push-service.js";

cron.schedule("0 * * * *", async () => {
    console.log("⏰ Checking reminders...");

    const now = new Date();
    const soon = new Date(now.getTime() + 2 * 86400000);

    const { data: events } = await supabase
        .from("case_events")
        .select("*")
        .lte("event_date", soon.toISOString())
        .eq("notified", false);

    for (const e of events || []) {
        try {
            const message = `⚖️ Reminder:
${e.title}
📅 ${new Date(e.event_date).toLocaleString()}`;

            const phone = "+91XXXXXXXXXX"; // 🔥 fetch from user later

            const { data: subscriptions } = await supabase
                .from("push_subscriptions")
                .select("*")
                .eq("user_id", e.user_id);

            for (const sub of subscriptions || []) {
                await sendPush(sub, message);
            }

            await sendSMS(phone, message);
            await sendWhatsApp(phone, message);

            await supabase
                .from("case_events")
                .update({ notified: true })
                .eq("id", e.id);

            console.log("✅ Notified:", e.title);
        } catch (err) {
            console.log("❌ Reminder failed:", e.id);
        }
    }
});