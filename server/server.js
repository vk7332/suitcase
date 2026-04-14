import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-payment-link", async (req, res) => {
    try {
        const { amount, description, customer } = req.body;

        const paymentLink = await razorpay.paymentLink.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            description,
            customer: {
                name: customer.name,
                email: customer.email,
                contact: customer.contact,
            },
            notify: {
                sms: true,
                email: true,
            },
            reminder_enable: true,
            callback_url: "http://localhost:5173/payment-success",
            callback_method: "get",
        });

        res.json({ payment_link: paymentLink.short_url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
);