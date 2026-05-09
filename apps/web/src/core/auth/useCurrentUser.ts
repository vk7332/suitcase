import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useCurrentUser() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function getUser() {
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (mounted) {
                setUser(user);
                setLoading(false);
            }
        }

        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (mounted) {
                    setUser(session?.user ?? null);
                }
            }
        );

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    return { user, loading };
}