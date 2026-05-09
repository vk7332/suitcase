export async function hasAccess(userId, feature) {
    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (user.plan === 'professional') return true;

    const { data: addons } = await supabase
        .from('user_addons')
        .select('addon_type')
        .eq('user_id', userId)
        .eq('status', 'active');

    return addons.some(a => a.addon_type === feature);
}