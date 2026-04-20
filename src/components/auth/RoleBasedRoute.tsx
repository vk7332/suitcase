import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useRole } from "@/context/rolecontext";
import { UserRole } from "@/types/roles";

interface RoleBasedRouteProps {
    children: ReactNode;
    allowedRoles: UserRole[];
}

const RoleBasedRoute = ({
    children,
    allowedRoles,
}: RoleBasedRouteProps) => {
    const { role, loading } = useRole();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default RoleBasedRoute;


