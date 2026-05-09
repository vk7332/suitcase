import { supabase } from '../supabase';
import { getOrg } from '../utils/org';

export function requireRole(roles: string[]) {
    return async (req: any, res: any, next: any) => {
        try {
            const orgId = await getOrg(req.user.id);

            if (!orgId) {
                return res.status(403).json({
                    error: 'No organization'
                });
            }

            const { data } = await supabase
                .from('organization_members')
                .select('role')
                .eq('org_id', orgId)
                .eq('user_id', req.user.id)
                .single();

            if (!data || !roles.includes(data.role)) {
                return res.status(403).json({
                    error: 'Insufficient permissions'
                });
            }

            next();

        } catch (err) {
            console.error(err);

            res.status(500).json({
                error: 'RBAC_FAILED'
            });
        }
    };
}