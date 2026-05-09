import express from 'express';
import { verifyUser } from '../middleware/verifyUser';
import { supabase } from '../supabase';
import OpenAI from 'openai';


const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// 🎯 Helper: estimate tokens (fallback)
function estimateTokens(text: string) {
    return Math.ceil(text.length / 4);
}

router.post('/suggest', verifyUser, async (req, res) => {
    const userId = req.user.id;
    const { input, session_id } = req.body;

    try {
        // 🔐 1. Check access (plan/add-on)
        const { data: user } = await supabase
            .from('users')
            .select('plan')
            .eq('id', userId)
            .single();

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Example: restrict advanced AI
        if (user.plan === 'starter') {
            return res.status(403).json({ error: 'Upgrade required' });
        }

        const orgId = await getOrg(userId);

        if (orgId) {
            const { data: orgCredits } = await supabase
                .from('org_credits')
                .select('*')
                .eq('org_id', orgId)
                .single();

            if (!orgCredits || orgCredits.balance <= 0) {
                return res.status(402).json({ error: 'ORG_NO_CREDITS' });
            }

            // deduct
            await supabase
                .from('org_credits')
                .update({
                    balance: orgCredits.balance - tokensUsed
                })
                .eq('org_id', orgId);
        } else {

            // 💰 2. Check credits
            const { data: credit } = await supabase
                .from('ai_credits')
                .select('balance')
                .eq('user_id', userId)
                .single();

            if (!credit || credit.balance <= 0) {
                await logEvent(userId, 'NO_CREDITS');
                return res.status(402).json({ error: 'NO_CREDITS' });
            }

            if (credit.expires_at && new Date(credit.expires_at) < new Date()) {
                return res.status(402).json({
                    error: 'CREDITS_EXPIRED'
                });
            }

            // 🤖 3. Call OpenAI
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a legal assistant for Indian advocates.'
                    },
                    {
                        role: 'user',
                        content: input
                    }
                ]
            });

            const output = completion.choices[0]?.message?.content || '';

            // 🔢 4. Token calculation
            const tokensUsed =
                completion.usage?.total_tokens || estimateTokens(output);

            // after tokens calculated

            await supabase.from('ai_usage_logs').insert({
                user_id: userId,
                tokens_used: tokensUsed,
                feature: 'suggest'
            });

            // 💳 5. Deduct credits
            await supabase
                .from('ai_credits')
                .update({
                    balance: credit.balance - tokensUsed
                })
                .eq('user_id', userId);

            // 📊 6. Log usage
            await supabase.from('ai_usage_logs').insert({
                user_id: userId,
                tokens_used: tokensUsed,
                feature: 'suggest'
            });

            // 📈 7. Track analytics
            await logEvent(userId, 'AI_USED', { tokens: tokensUsed });

            // ✅ 8. Response
            res.json({
                suggestions: [
                    {
                        text: output,
                        confidence: 0.9
                    }
                ]
            });

        } catch (err) {
            console.error(err);
            await logEvent(userId, 'AI_ERROR');

            res.status(500).json({ error: 'AI_FAILED' });
        }
    });

// 📊 Analytics logger
async function logEvent(userId: string, event: string, metadata: any = {}) {
    await supabase.from('analytics_events').insert({
        user_id: userId,
        event,
        metadata
    });
}

export default router;