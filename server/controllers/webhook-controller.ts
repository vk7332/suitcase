import { Request, Response } from "express";
import crypto from "crypto";
import { logger } from "../utils/logger.js";

export const handleRazorpayWebhook = (
    req: Request,
    res: Response
) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const signature = req.headers["x-razorpay-signature"] as string;

    const body = JSON.stringify(req.body);

    const expected = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex");

    if (expected !== signature) {
        logger.warn("Invalid webhook signature");
        return res.status(400).send("Invalid signature");
    }

    logger.info("Webhook received", req.body);

    res.json({ status: "ok" });
};