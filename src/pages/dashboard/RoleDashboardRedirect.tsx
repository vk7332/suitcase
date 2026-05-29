import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabase-client";
import { getDashboardPathForRole } from "@/utils/role-routes";

export default function RoleDashboardRedirect() {
    const [loading, setLoading] = useState(true);
    const [targetPath, setTargetPath] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const resolveDashboard = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!isMounted) return;

            if (!user) {
                setTargetPath("/login");
                setLoading(false);
                return;
            }

            const { data: profile, error } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (!isMounted) return;

            if (error) {
                console.error("RoleDashboardRedirect: profile fetch failed", error);
                setTargetPath("/onboarding");
            } else {
                setTargetPath(getDashboardPathForRole(profile?.role));
            }

            setLoading(false);
        };

        resolveDashboard();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#089CCE]" />
                <p className="font-medium text-gray-600">Opening your dashboard...</p>
            </div>
        );
    }

    return <Navigate to={targetPath ?? "/onboarding"} replace />;
}
