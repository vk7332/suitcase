import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function ProtectedRoute({
    children,
    role,
    allowedRoles,
}: {
    children: any;
    role?: string;
    allowedRoles?: string[];
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

            const userRole = data?.role;

            if (role && userRole === role) {
                setAllowed(true);
            } else if (allowedRoles && allowedRoles.includes(userRole)) {
                setAllowed(true);
            } else if (!role && !allowedRoles) {
                setAllowed(true);
            } else {
                setAllowed(false);
            }

            setLoading(false);
        };

        checkAccess();
    }, [role, allowedRoles]);

    if (loading) return <div>Loading...</div>;

    if (!allowed) return <Navigate to="/subscription" />;

    return children;
}
