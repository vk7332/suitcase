import { UserRole } from "@/types/roles";

export const rolePermissions: Record<UserRole, string[]> = {
    admin: [
        "dashboard",
        "clients",
        "invoices",
        "ledger",
        "reports",
        "settings",
        "users",
    ],
    advocate: [
        "dashboard",
        "clients",
        "invoices",
        "ledger",
        "reports",
        "cases",
        "documents",
    ],
    junior_advocate: [
        "dashboard",
        "clients",
        "cases",
        "documents",
        "calendar",
    ],
    staff: [
        "dashboard",
        "clients",
        "invoices",
        "ledger",
        "calendar",
    ],
    client: [
        "dashboard",
        "invoices",
        "ledger",
        "documents",
    ],
    litigant: [
        "dashboard",
        "cases",
        "documents",
    ],
    public: [
        "portal",
        "case-status",
    ],
};

export const hasPermission = (
    role: UserRole,
    permission: string
): boolean => {
    return rolePermissions[role]?.includes(permission) ?? false;
};

export const hasRole = (
    role: UserRole,
    allowedRoles: UserRole[]
): boolean => {
    return allowedRoles.includes(role);
};