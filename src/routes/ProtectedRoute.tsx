import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({
    children,
    allowedRoles,
}: any) {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    // ❌ Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ❌ Role not allowed
    if (
        allowedRoles &&
        profile &&
        !allowedRoles.includes(profile.role)
    ) {
        return (
            <div className="p-6 text-red-600">
                Unauthorized Access
            </div>
        );
    }

    return children;
}
