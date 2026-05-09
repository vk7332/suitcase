import { expireAddons } from './expireAddons';
import { downgradeExpiredUsers } from './downgradeUsers';
import { monitorBurn } from './burnMonitor';
import { expireCredits } from './creditExpiry';
import { refreshAnalytics } from './analyticsRefresh';

export function startCronJobs() {

    // run every 24 hours
    setInterval(async () => {
        console.log('Running daily billing jobs...');

        await expireAddons();
        await downgradeExpiredUsers();

    }, 1000 * 60 * 60 * 24);
    setInterval(monitorBurn, 1000 * 60 * 10); // every 10 min
}

export async function detectEnterprise(userId: string) {
    const { data } = await supabase
        .from('ai_usage_logs')
        .select('tokens_used')
        .eq('user_id', userId);

    const total = data.reduce((s, r) => s + r.tokens_used, 0);
    setInterval(refreshAnalytics, 1000 * 60 * 10); // every 10 min
    setInterval(expireCredits, 1000 * 60 * 60 * 6); // every 6 hours

    return total > 50000;
}