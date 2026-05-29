import { razorpay } from "../config/razorpay-config.js";

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
        });

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};