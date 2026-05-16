const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();

// 🔐 Supabase Admin Client (SERVER ONLY)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

// 💳 Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

// 👉 CREATE ORDER
router.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: 69900, // ₹699
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Order creation failed" });
    }
});

// 👉 VERIFY PAYMENT + ACTIVATE SUBSCRIPTION
router.post("/verify-payment", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userId,
        } = req.body;

        // 🔐 VERIFY SIGNATURE
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        // ✅ UPDATE SUBSCRIPTION
        await supabase
            .from("profiles")
            .update({
                subscription_status: "active",
                plan: "pro",
                subscription_start: new Date(),
            })
            .eq("id", userId);

        // 💰 ADD COMMISSION
        const { data: referral } = await supabase
            .from("referrals")
            .select("referrer_id")
            .eq("user_id", userId)
            .single();

        if (referral?.referrer_id) {
            await supabase.from("earnings").insert({
                user_id: referral.referrer_id,
                amount: 100,
            });
        }

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Payment verification failed" });
    }
});

module.exports = router;