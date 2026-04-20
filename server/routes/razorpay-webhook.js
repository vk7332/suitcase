const express = require("express");
const crypto = require("crypto");
const router = express.Router();

// IMPORTANT: use raw body middleware
router.post(
    "/razorpay-webhook",
    express.raw({ type: "application/json" }),
    (req, res) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        const signature = req.headers["x-razorpay-signature"];

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(req.body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).send("Invalid signature");
        }

        const event = JSON.parse(req.body.toString());

        if (event.event === "payment.captured") {
            const payment = event.payload.payment.entity;

            console.log("Payment verified:", payment.id);

            // 👉 TODO:
            // update subscription in DB securely
        }

        res.json({ status: "ok" });
    }
);

module.exports = router;