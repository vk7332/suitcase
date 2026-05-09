import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { verifyUser } from '../middleware/verifyUser';
import { supabase } from '../supabase';

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
});

// 🎯 Credit Packs
const PACKS = {
    small: { amount: 19900, credits: 1000 },
    medium: { amount: 49900, credits: 3000 },
    large: { amount: 99900, credits: 7000 }
};

/**
 * 💳 Create Order
 */
router.post('/buy', verifyUser, async (req, res) => {
    const { pack } = req.body;

    const selected = PACKS[pack as keyof typeof PACKS];
    if (!selected) {
        return res.status(400).json({ error: 'Invalid pack' });
    }

    try {
        const order = await razorpay.orders.create({
            amount: selected.amount,
            currency: 'INR',
            notes: {
                user_id: req.user.id,
                credits: selected.credits.toString()
            }
        });

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'ORDER_FAILED' });
    }
});

/**
 * ✅ Verify Payment + Add Credits
 */
router.post('/verify', verifyUser, async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        credits
    } = req.body;

    try {
        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ error: 'INVALID_SIGNATURE' });
        }

        // 🔍 Get existing balance
        const { data: existing } = await supabase
            .from('ai_credits')
            .select('balance')
            .eq('user_id', req.user.id)
            .maybeSingle();

        const newBalance = (existing?.balance || 0) + credits;

        // 💰 Add credits + expiry
        await supabase.from('ai_credits').upsert({
            user_id: req.user.id,
            balance: newBalance,
            expires_at: new Date(Date.now() + 30 * 86400000)
        });

        // 📊 Log purchase
        await supabase.from('credit_purchases').insert({
            user_id: req.user.id,
            amount: 0, // optional: map from pack
            credits
        });

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'VERIFY_FAILED' });
    }
});

/**
 * 📊 Get Balance
 */
router.get('/balance', verifyUser, async (req, res) => {
    const { data } = await supabase
        .from('ai_credits')
        .select('balance, expires_at')
        .eq('user_id', req.user.id)
        .single();

    res.json({
        balance: data?.balance || 0,
        expires_at: data?.expires_at
    });
});

export default router;