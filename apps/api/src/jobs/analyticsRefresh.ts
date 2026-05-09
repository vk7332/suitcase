import { supabase } from '../supabase';

export async function refreshAnalytics() {
    try {
        await supabase.rpc('refresh_analytics');
        console.log('✅ Analytics refreshed');
    } catch (err) {
        console.error('❌ Analytics refresh failed', err);
    }
}