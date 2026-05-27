import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRoleGuard = (user: any, allowedRoles: string[]) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        if (!allowedRoles.includes(user.role)) {
            navigate("/unauthorized");
        }
    }, [user, allowedRoles, navigate]);
};
