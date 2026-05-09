// apps/api/src/jobs/burnMonitor.ts

export async function monitorBurn() {
    const { data } = await supabase.rpc('burn_spike');

    if (data[0]?.status === 'SPIKE') {
        console.warn('🚨 Burn spike detected');
        // send email / slack later
    }
}