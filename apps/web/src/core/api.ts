import { supabase } from '@/lib/supabase';

export async function requestAISuggestion(input: string, sessionId: string) {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) throw new Error('User not authenticated');

    const res = await fetch('http://localhost:4000/ai/suggest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ input, sessionId })
    });

    return res.json();
}