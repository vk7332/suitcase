export async function detectEnterprise(userId: string) {
    const { data } = await supabase
        .from('ai_usage_logs')
        .select('tokens_used')
        .eq('user_id', userId);

    const total = data.reduce((s, r) => s + (r.tokens_used || 0), 0);

    return total > 50000;
}