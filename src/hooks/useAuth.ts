import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useAuth = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get session
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });

        // Listen for changes
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_, session) => {
                setSession(session);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return {
        session,
        user: session?.user,
        accessToken: session?.access_token,
        loading,
    };
};
