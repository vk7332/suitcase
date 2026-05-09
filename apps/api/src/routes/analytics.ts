import express from 'express';
import { supabase } from '../supabase';
import { verifyUser } from '../middleware/verifyUser';
import { requireAdmin } from '../middleware/requireAdmin';

const router = express.Router();

/**
 * 📊 Burn Rate (daily tokens usage)
 */
router.get('/burn-rate', verifyUser, requireAdmin, async (req, res) => {
    const { data, error } = await supabase.rpc('burn_rate_daily');

    if (error) return res.status(500).json({ error });

    res.json(data);
});

/**
 * 🏆 Top Users
 */
router.get('/top-users', verifyUser, requireAdmin, async (req, res) => {
    const { data, error } = await supabase.rpc('top_users');

    if (error) return res.status(500).json({ error });

    res.json(data);
});

/**
 * 💰 Revenue
 */
router.get('/revenue', verifyUser, requireAdmin, async (req, res) => {
    const { data, error } = await supabase.rpc('total_revenue');

    if (error) return res.status(500).json({ error });

    res.json(data);
});

/**
 * 📈 Forecast
 */
router.get('/forecast', verifyUser, requireAdmin, async (req, res) => {
    const { data, error } = await supabase.rpc('revenue_forecast');

    if (error) return res.status(500).json({ error });

    res.json(data);
});

/**
 * 🚨 Burn Spike Detection
 */
router.get('/burn-alert', verifyUser, requireAdmin, async (req, res) => {
    const { data, error } = await supabase.rpc('burn_spike');

    if (error) return res.status(500).json({ error });

    res.json(data);
});

router.get('/burn-rate', async (req, res) => {
    const { data } = await supabase
        .from('mv_burn_daily')
        .select('*');

    res.json(data);
});

export default router;