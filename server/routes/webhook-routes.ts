import express from "express";
import { supabase } from "../config/supabase";
import crypto from "crypto";

const router = express.Router();

router.post("/razorpay", async (req, res) => {
    try {
        let event;
        
        // Handle raw body if it's a Buffer (from express.raw)
        if (Buffer.isBuffer(req.body)) {
            const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
            const signature = req.headers["x-razorpay-signature"] as string;

            if (secret && signature) {
                const expectedSignature = crypto
                    .createHmac("sha256", secret)
                    .update(req.body)
                    .digest("hex");

                if (expectedSignature !== signature) {
                    console.error("❌ Invalid Razorpay signature");
                    return res.status(400).json({ error: "invalid signature" });
                }
            }
            event = JSON.parse(req.body.toString());
        } else {
            event = req.body;
        }

        // 🧪 DEBUG LOG
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