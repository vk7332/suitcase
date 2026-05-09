import { requireAdmin } from '../middleware/requireAdmin';

app.get('/admin/users', verifyUser, requireAdmin, async (req, res) => {
    const { data } = await supabase
        .from('users')
        .select('*');

    res.json(data);
});

app.get('/admin/addons', verifyUser, requireAdmin, async (req, res) => {
    const { data } = await supabase
        .from('user_addons')
        .select('user_id, addon_type, status');

    res.json(data);
});

app.get('/admin/revenue', verifyUser, requireAdmin, async (req, res) => {

    const { data } = await supabase
        .from('payments')
        .select('amount');

    const total = data.reduce((sum, p) => sum + p.amount, 0);

    res.json({ total });
});

app.get('/admin/users', verifyUser, requireAdmin, async (req, res) => {
    // secure
});