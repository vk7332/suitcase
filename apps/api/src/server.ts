import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { aiQueue } from './queue';
import { v4 as uuidv4 } from 'uuid';
import { verifyUser } from './middleware/auth';
import { razorpayWebhook } from './webhooks/razorpay';
import { startCronJobs } from './jobs/cron';
import { refreshAnalytics } from './jobs/analyticsRefresh';
import { expireCredits } from './jobs/creditExpiry';

// every 10 min
setInterval(refreshAnalytics, 1000 * 60 * 10);

// every 6 hours
setInterval(expireCredits, 1000 * 60 * 60 * 6);

startCronJobs();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // backend only
);

app.post('/ai/suggest', verifyUser, async (req, res) => {
    const userId = req.user.id; // ✅ secure

    const { sessionId, input } = req.body;

    const job = await aiQueue.add('AI_SUGGESTION', {
        sessionId,
        input,
        userId
    });

    res.json({ jobId: job.id });
});


app.listen(4000, () => {
    console.log('API running on port 4000');
});

app.post('/webhooks/razorpay', express.json(), razorpayWebhook);
