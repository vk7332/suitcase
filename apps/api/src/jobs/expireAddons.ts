export async function expireAddons() {
    await supabase
        .from('user_addons')
        .update({ status: 'expired' })
        .lt('expires_at', new Date().toISOString());
}