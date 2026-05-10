import { useRoleContext } from "@/context/role-context";
import { ROLES, UserRole } from "@/types/roles";

export const useRole = () => {
    const { role, loading, refreshRole } = useRoleContext();

    /**
     * Check if the user has one of the allowed roles
     */
    const hasRole = (allowedRoles: UserRole[]): boolean => {
        if (!role) return false;
        return allowedRoles.includes(role);
    };

    /**
     * Role helper flags
     */
    const isAdmin = role === ROLES.ADMIN;
    const isAdvocate = role === ROLES.ADVOCATE;
    const isJuniorAdvocate = role === ROLES.JUNIOR_ADVOCATE;
    const isStaff = role === ROLES.STAFF;
    const isClient = role === ROLES.CLIENT;
    const isLitigant = role === ROLES.LITIGANT;
    const isPublic = role === ROLES.PUBLIC;

    return {
        role,
        loading,
        refreshRole,
        hasRole,
        isAdmin,
        isAdvocate,
        isJuniorAdvocate,
        isStaff,
        isClient,
        isLitigant,
        isPublic,
    };
};


