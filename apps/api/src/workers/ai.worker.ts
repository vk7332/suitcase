import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const connection = new IORedis(process.env.REDIS_URL!);

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const worker = new Worker('ai-queue', async job => {
    const { input, userId, sessionId } = job.data;

    const stream = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: input }],
        stream: true
    });

    let fullText = '';

    for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content;
        if (!token) continue;

        fullText += token;

        await supabase.from('job_results').insert({
            user_id: userId,
            session_id: sessionId,
            result: { partial: token },
            is_verified: false
        });

        // ✅ ADD THIS (prevents DB overload)
        await new Promise(r => setTimeout(r, 100));
    }

    if (!fullText || fullText.length < 5) {
        // fallback logic
        await supabase.from('job_results').insert({
            user_id: userId,
            session_id: sessionId,
            result: { final: "⚠️ Suggestion unavailable. Use cached precedent." },
            is_verified: false
        });

        return;
    }

    // Final verified output
    await supabase.from('job_results').insert({
        user_id: userId,
        session_id: sessionId,
        result: { final: fullText },
        is_verified: true
    });
});

worker.on('completed', job => {
    console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
});
