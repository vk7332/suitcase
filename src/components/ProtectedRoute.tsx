import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabase-client";
import { getDashboardPathForRole, normalizeRole, rolesMatch } from "@/utils/role-routes";

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [dashboardPath, setDashboardPath] = useState("/dashboard");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (loading) {
                console.warn("ProtectedRoute: Access check timed out after 5s");
                setLoading(false);
            }
        }, 5000);

        const checkAccess = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    setIsAuthenticated(false);
                    setAllowed(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                const { data, error } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single();

                if (error) throw error;

                const userRole = data?.role;
                setDashboardPath(getDashboardPathForRole(userRole));

                if (role && rolesMatch(userRole, role)) {
                    setAllowed(true);
                } else if (allowedRoles && allowedRoles.some((allowedRole) => normalizeRole(allowedRole) === normalizeRole(userRole))) {
                    setAllowed(true);
                } else if (!role && !allowedRoles) {
                    setAllowed(true);
                } else {
                    setAllowed(false);
                }
            } catch (err) {
                console.error("ProtectedRoute: Error checking access:", err);
                setAllowed(false);
            } finally {
                setLoading(false);
                clearTimeout(timeoutId);
            }
        };

        checkAccess();
        return () => clearTimeout(timeoutId);
    }, [role, allowedRoles]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#089CCE] mb-4"></div>
            <p className="text-gray-600 font-medium">Verifying Access...</p>
        </div>
    );

    if (!isAuthenticated) return <Navigate to="/login" />;
    
    if (!allowed) {
        console.warn("Access denied for role, redirecting to user's dashboard");
        return <Navigate to={dashboardPath} replace />;
    }

    return children;
}
