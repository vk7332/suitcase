import { useEffect } from 'react';
import { getQueue, clearQueue } from './offlineQueue';
import { requestAISuggestion } from '@/core/api';

export function useSyncQueue() {
    useEffect(() => {
        async function sync() {
            const queue = getQueue();

            for (const item of queue) {
                try {
                    await requestAISuggestion(item.input, item.sessionId);
                } catch (err) {
                    return; // stop if still failing
                }
            }

            clearQueue();
        }

        window.addEventListener('online', sync);

        return () => {
            window.removeEventListener('online', sync);
        };
    }, []);
}