import { razorpay } from "../services/razorpay.service";
import { Request, Response } from 'express';

export const createSubscription = async (req: Request, res: Response) => {
    const { plan } = req.body as { plan: 'pro' | 'enterprise' };

    const planMap = {
        pro: process.env.RAZORPAY_PLAN_PRO,
        enterprise: process.env.RAZORPAY_PLAN_ENTERPRISE,
    } as const;

    const subscription = await razorpay.subscriptions.create({
        plan_id: planMap[plan],
        total_count: 12,

        // ✅ MUST ADD HERE
        notes: {
            chamber_id: req.user.chamber_id,
        },
    });

    res.json(subscription);
};

export const razorpayWebhook = async (_req: Request, res: Response) => {
    res.status(200).json({ received: true });
};
