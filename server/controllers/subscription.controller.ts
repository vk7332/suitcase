import Razorpay from "razorpay";
import { Request, Response } from 'express';
import { supabase } from "../config/supabase";

type PaidPlan = "pro" | "enterprise";

const isPaidPlan = (plan: unknown): plan is PaidPlan =>
    plan === "pro" || plan === "enterprise";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createSubscription = async (req: Request, res: Response) => {
    const user = req.user;

    const plan = req.body.plan; // pro / enterprise

    if (!isPaidPlan(plan)) {
        return res.status(400).json({ error: "invalid plan" });
    }

    const planMap: Record<PaidPlan, string | undefined> = {
        pro: process.env.RAZORPAY_PLAN_PRO,
        enterprise: process.env.RAZORPAY_PLAN_ENTERPRISE,
    };

    const plan_id = planMap[plan];

    if (!plan_id) {
        return res.status(400).json({ error: "invalid plan" });
    }

    const subscription = await razorpay.subscriptions.create({
        plan_id,
        customer_notify: 1,
        total_count: 12,
        notes: {
            chamber_id: user.chamber_id,
        },
    });

    res.json(subscription);
};
