import { supabase } from '../supabase';

export async function getOrg(userId: string) {
    const { data } = await supabase
        .from('organization_members')
        .select('org_id')
        .eq('user_id', userId)
        .maybeSingle();

    return data?.org_id || null;
}

export async function getOrgUsers(orgId: string) {
    const { data } = await supabase
        .from('organization_members')
        .select('user_id')
        .eq('org_id', orgId);

    return data.map(d => d.user_id);
}

export async function logEvent(userId: string, event: string) {
    await supabase
        .from('analytics_events')
        .insert({
            user_id: userId,
            event
        });
}

app.post('/org/credits/buy', verifyUser, async (req, res) => {
    const orgId = await getOrg(req.user.id);

    if (!orgId) {
        return res.status(400).json({ error: 'No organization' });
    }

    // Razorpay order here
    res.json({ success: true });
});