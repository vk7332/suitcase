export async function shouldSuggestUpgrade(userId: string) {

    const { data: usage } = await supabase
        .from('ai_usage_logs')
        .select('id', { count: 'exact' })
        .eq('user_id', userId);

    const { data: events } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('user_id', userId)
        .eq('event', 'LIMIT_HIT');

    if (usage.length > 80 || events.length > 2) {
        return {
            show: true,
            message: 'You are using AI heavily. Upgrade for uninterrupted access.'
        };
    }

    return { show: false };
}