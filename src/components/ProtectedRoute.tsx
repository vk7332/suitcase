import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabaseclient";

export default function ProtectedRoute({
    children,
    role,
}: {
    children: any;
    role: string;
}) {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const checkAccess = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setAllowed(false);
                setLoading(false);
                return;
            }

            const { data } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (data?.role === role) {
                setAllowed(true);
            } else {
                setAllowed(false);
            }

            setLoading(false);
        };

        checkAccess();
    }, [role]);

    if (loading) return <div>Loading...</div>;

    if (!allowed) return <Navigate to="/subscription" />;

    return children;
}