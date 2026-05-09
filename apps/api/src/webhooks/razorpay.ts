import { Request, Response } from 'express';
import crypto from 'crypto';
import { supabase } from '../supabase';

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function razorpayWebhook(req: Request, res: Response) {
    const signature = req.headers['x-razorpay-signature'] as string;

    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

    if (signature !== expectedSignature) {
        return res.status(400).send('Invalid signature');
    }

    const event = req.body.event;
    const payload = req.body.payload;

    try {
        switch (event) {

            // ✅ Subscription activated
            case 'subscription.activated': {
                const sub = payload.subscription.entity;

                await supabase
                    .from('subscriptions')
                    .update({
                        status: 'active',
                        current_period_end: new Date(sub.current_end * 1000)
                    })
                    .eq('razorpay_subscription_id', sub.id);

                break;
            }

            // 💳 Payment success
            case 'payment.captured': {
                const payment = payload.payment.entity;

                await supabase.from('payments').insert({
                    user_id: payment.notes?.user_id,
                    razorpay_payment_id: payment.id,
                    amount: payment.amount,
                    status: 'success'
                });

                break;
            }

            // ❌ Payment failed → GRACE MODE
            case 'payment.failed': {
                const payment = payload.payment.entity;

                const userId = payment.notes?.user_id;

                await supabase
                    .from('users')
                    .update({
                        status: 'grace',
                        grace_until: new Date(Date.now() + 3 * 86400000)
                    })
                    .eq('id', userId);

                break;
            }

            // 🚫 Subscription cancelled
            case 'subscription.cancelled': {
                const sub = payload.subscription.entity;

                await supabase
                    .from('users')
                    .update({
                        plan: 'starter',
                        status: 'active'
                    })
                    .eq('id', sub.notes?.user_id);

                break;
            }
        }

        res.status(200).send('ok');

    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
}