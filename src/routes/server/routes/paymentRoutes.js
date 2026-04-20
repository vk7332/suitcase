const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpayConfig");

router.post("/create-order", async (req, res) => {
    const options = {
        amount: 99900, // ₹999
        currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
});

module.exports = router;