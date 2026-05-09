import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { requestAISuggestion } from '@/core/api';
import { useCurrentUser } from '@/core/auth/useCurrentUser';
import { send } from 'process';
import { useHearingMachine } from '../../core/stateMachine/useHearingMachine';
import { addToQueue } from '@/core/offline/offlineQueue';

type Suggestion = {
    text: string;
    confidence?: number;
};

export function useAISuggestions(sessionId: string, send: any) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);

    async function request(input: string) {
        setLoading(true);

        try {
            const res = await fetch('/api/ai/suggest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    input,
                    session_id: sessionId
                })
            });

            // 🚫 Access blocked → show upgrade
            if (res.status === 403) {
                setShowUpgrade(true);
                send({ type: 'AI_FAILURE' });
                return;
            }

            if (res.status === 402) {
                setShowUpgrade(true);
                return;
            }

            const data = await res.json();

            setSuggestions(data.suggestions || []);

            // 📊 Track usage (frontend signal)
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: 'AI_USED' })
            });

            send({ type: 'AI_SUCCESS' });

        } catch (err) {
            console.error(err);
            addToQueue({ input, sessionId });
            send({ type: 'AI_FAILURE' });
        } finally {
            setLoading(false);
        }
    }

    return {
        suggestions,
        loading,
        request,
        showUpgrade,
        setShowUpgrade
    };
}


