import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";
import { useNavigate } from "react-router-dom";

export const useClientAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error || !data?.user) {
                navigate("/login");
                return;
            }

            // 🔹 fetch role from profile table
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", data.user.id)
                .single();

            if (!profile) {
                navigate("/login");
                return;
            }

            const fullUser = {
                ...data.user,
                role: profile.role,
            };

            setUser(fullUser);

            // 🔐 ROLE CHECK (CLIENT ONLY)
            if (profile.role !== "client") {
                console.warn("User is not a client, redirecting to home");
                navigate("/");
                return;
            }

            setLoading(false);
        };

        getUser();
    }, [navigate]);

    return { user, loading };
};
