import express from 'express';
import { verifyUser } from '../middleware/verifyUser';
import { supabase } from '../supabase';
import { getOrg } from '../utils/org';
import { requireRole } from '../middleware/requireRole';

const router = express.Router();

/**
 * 👥 Get Organization Members
 */
router.get('/members', verifyUser, async (req, res) => {
    try {
        const orgId = await getOrg(req.user.id);

        if (!orgId) {
            return res.status(404).json({
                error: 'Organization not found'
            });
        }

        const { data, error } = await supabase
            .from('organization_members')
            .select('*')
            .eq('org_id', orgId);

        if (error) {
            return res.status(500).json({ error });
        }

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'MEMBERS_FETCH_FAILED'
        });
    }
});

/**
 * 💰 Organization Credits
 */
router.get('/credits', verifyUser, async (req, res) => {
    try {
        const orgId = await getOrg(req.user.id);

        if (!orgId) {
            return res.status(404).json({
                error: 'Organization not found'
            });
        }

        const { data, error } = await supabase
            .from('org_credits')
            .select('*')
            .eq('org_id', orgId)
            .single();

        if (error) {
            return res.status(500).json({ error });
        }

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'ORG_CREDITS_FAILED'
        });
    }
});

/**
 * ➕ Invite Member
 */
router.post('/invite', verifyUser, async (req, res) => {
    try {
        const { email, role } = req.body;

        const orgId = await getOrg(req.user.id);

        if (!orgId) {
            return res.status(404).json({
                error: 'Organization not found'
            });
        }

        // 🔍 Find user
        const { data: user } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // 👥 Add member
        const { error } = await supabase
            .from('organization_members')
            .insert({
                org_id: orgId,
                user_id: user.id,
                role: role || 'member'
            });

        router.post(
            '/invite',
            verifyUser,
            requireRole(['owner', 'admin']),
            async (req, res) => {
                // existing code
            }
        );

        if (error) {
            return res.status(500).json({ error });
        }

        res.json({ success: true });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: 'INVITE_FAILED'
        });
    }
});

export default router;