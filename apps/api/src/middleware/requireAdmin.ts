import { supabase } from '../supabase';

export async function requireAdmin(
    req: any,
    res: any,
    next: any
) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                error: 'UNAUTHORIZED'
            });
        }

        /**
         * 🔍 Check user role
         */
        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', userId)
            .single();

        if (error) {
            console.error(error);

            return res.status(500).json({
                error: 'ADMIN_CHECK_FAILED'
            });
        }

        /**
         * 🚫 Reject non-admins
         */
        if (!data || data.role !== 'admin') {
            return res.status(403).json({
                error: 'ADMIN_ONLY'
            });
        }

        next();

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: 'ADMIN_MIDDLEWARE_FAILED'
        });
    }
}