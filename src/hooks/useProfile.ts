import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export interface Profile {
    id: string;
    full_name: string;
    enrollment_number: string;
    chamber_name: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    logo_url: string;
    signature_url: string;
}

export const useProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        setLoading(true);

        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        if (!user) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (!error) {
            setProfile(data);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return { profile, loading, refetch: fetchProfile };
};
