const express = require("express");
const router = express.Router();
const crypto = require("crypto");

router.post("/razorpay-webhook", (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    const signature = req.headers["x-razorpay-signature"];

    if (digest === signature) {
        const event = req.body.event;

        if (event === "payment.captured") {
            const payment = req.body.payload.payment.entity;

            console.log("Payment success:", payment);

            // 👉 TODO: update user subscription in DB
        }

        res.json({ status: "ok" });
    } else {
        res.status(400).send("Invalid signature");
    }
});

module.exports = router;