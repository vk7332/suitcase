import { supabase } from '../supabase';

export async function expireCredits() {
    try {
        await supabase
            .from('ai_credits')
            .update({ balance: 0 })
            .lt('expires_at', new Date().toISOString());

        console.log('✅ Expired credits cleared');
    } catch (err) {
        console.error('❌ Expiry job failed', err);
    }
}