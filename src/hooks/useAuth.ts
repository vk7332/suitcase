import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser();

        const { data: listener } =
            supabase.auth.onAuthStateChange(() => {
                getUser();
            });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const getUser = async () => {
        const { data } = await supabase.auth.getSession();

        const currentUser = data.session?.user || null;
        setUser(currentUser);

        if (currentUser) {
            const { data: profileData } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", currentUser.id)
                .single();

            setProfile(profileData);
        }

        setLoading(false);
    };

    return { user, profile, loading };
}
