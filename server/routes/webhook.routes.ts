import express from "express";
import { supabase } from "../config/supabase";

const router = express.Router();

router.post("/razorpay", async (req, res) => {
    try {
        const event = req.body;

        // 🧪 DEBUG LOG (ADD HERE — TOP OF HANDLER)
        console.log("WEBHOOK EVENT:", event.event);

        // =========================
        // SUBSCRIPTION ACTIVATED
        // =========================
        if (event.event === "subscription.activated") {
            const sub = event.payload.subscription.entity;

            const chamber_id = sub.notes?.chamber_id;

            if (!chamber_id) {
                console.error("❌ Missing chamber_id in webhook notes");
                return res.status(400).json({ error: "missing chamber_id" });
            }

            const { error } = await supabase.from("subscriptions").upsert([
                {
                    chamber_id,
                    razorpay_subscription_id: sub.id,
                    plan: "pro",
                    status: "active",
                    current_period_end: new Date(sub.current_end * 1000),
                },
            ]);

            if (error) {
                console.error("❌ Supabase error:", error);
            }

            console.log("✅ Subscription activated for:", chamber_id);
        }

        // =========================
        // SUBSCRIPTION CANCELLED
        // =========================
        if (event.event === "subscription.cancelled") {
            const sub = event.payload.subscription.entity;

            await supabase
                .from("subscriptions")
                .update({ status: "inactive" })
                .eq("razorpay_subscription_id", sub.id);

            console.log("⚠️ Subscription cancelled:", sub.id);
        }

        // =========================
        // PAYMENT FAILED (OPTIONAL)
        // =========================
        if (event.event === "payment.failed") {
            console.log("❌ Payment failed");
        }

        res.json({ status: "ok" });
    } catch (err) {
        console.error("🔥 Webhook error:", err);
        res.status(500).json({ error: "webhook failed" });
    }
});

export default router;