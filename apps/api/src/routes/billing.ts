import Razorpay from 'razorpay';
import { changePlan } from '../services/billing.service';
import { verifyUser } from '../middleware/auth';
import { shouldSuggestUpgrade } from '../services/upgradeEngine';

const razorpay = new Razorpay({
    key_id: process.env.RZP_KEY!,
    key_secret: process.env.RZP_SECRET!
});

const isEnterprise = await detectEnterprise(userId);
res.json({ isEnterprise });

export async function createSubscription(req, res) {
    const { planId } = req.body;

    const subscription = await razorpay.subscriptions.create({
        plan_id: planId,
        customer_notify: 1,
        total_count: 12,
        notes: {
            user_id: req.user.id
        }
    });

    res.json(subscription);
}

app.post('/billing/change-plan', verifyUser, async (req, res) => {
    const { subscriptionId, newPlanId } = req.body;

    await changePlan({ subscriptionId, newPlanId });

    res.json({ success: true });
});

app.post('/billing/create-subscription', verifyUser, async (req, res) => {
    const { planId } = req.body;


    const subscription = await razorpay.subscriptions.create({
        plan_id: planId,
        customer_notify: 1,
        total_count: 12
    });
    res.json(subscription);
});

app.post('/billing/verify', verifyUser, async (req, res) => {
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;
    const generated_signature = crypto.createHmac('sha256', process.env.RZP_SECRET!)
        .update(razorpay_payment_id + '|' + razorpay_subscription_id)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        // ✅ signature valid
        await supabase.from('subscriptions').update({
            status: 'active'
        }).eq('razorpay_subscription_id', razorpay_subscription_id);
        res.json({ success: true });
    } else {
        // ❌ invalid signature
        res.status(400).json({ success: false, error: 'Invalid signature' });
    }
});

app.post('/addons/verify', verifyUser, async (req, res) => {
    const { razorpay_payment_id, addonType } = req.body;

    await supabase.from('user_addons').insert({
        user_id: req.user.id,
        addon_type: addonType,
        status: 'active',
        expires_at: new Date(Date.now() + 30 * 86400000)
    });

    res.json({ success: true });
});

app.get('/billing/usage', verifyUser, async (req, res) => {
    const userId = req.user.id;

    // example logic
    const used = 72; // from logs
    const limit = 100;

    res.json({ used, limit });
});

app.get('/billing/trial-status', verifyUser, async (req, res) => {
    // Example
    res.json({ daysLeft: 2 });
});

app.get('/billing/upgrade-suggestion', verifyUser, async (req, res) => {
    const result = await shouldSuggestUpgrade(req.user.id);
    res.json(result);
});

app.post('/credits/verify', verifyUser, async (req, res) => {
    const { razorpay_payment_id, credits } = req.body;

    await supabase.from('ai_credits').upsert({
        user_id: req.user.id,
        balance: credits
    });

    await supabase.from('credit_purchases').insert({
        user_id: req.user.id,
        amount: 0,
        credits
    });

    res.json({ success: true });
});

app.get('/credits/balance', verifyUser, async (req, res) => {
    const { data } = await supabase
        .from('ai_credits')
        .select('balance')
        .eq('user_id', req.user.id)
        .single();

    res.json({ balance: data?.balance || 0 });
});
