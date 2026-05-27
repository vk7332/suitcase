import { UserRole } from "@/types/roles";

export type AppRole = UserRole;

export const normalizeRole = (role?: string | null): AppRole | null => {
    if (!role) return null;

    const value = role.trim().toLowerCase().replace(/[_-]+/g, " ");

    const aliases: Record<string, AppRole> = {
        admin: "admin",
        advocate: "advocate",
        "junior advocates": "junior advocates",
        "junior advocate": "junior advocates",
        junior: "junior advocates",
        "staff(clerks)": "staff(clerks)",
        "staff (clerks)": "staff(clerks)",
        staff: "staff(clerks)",
        clerks: "staff(clerks)",
        clerk: "staff(clerks)",
        "staff clerk": "staff(clerks)",
        "staff clerks": "staff(clerks)",
        client: "client",
        litigant: "litigant",
        public: "public",
        affiliate: "affiliate",
    };

    return aliases[value] ?? null;
};

export const dashboardPathByRole: Record<AppRole, string> = {
    admin: "/admin",
    advocate: "/advocate",
    "junior advocates": "/junior-advocate",
    "staff(clerks)": "/staff",
    client: "/client",
    litigant: "/litigant",
    public: "/public",
    affiliate: "/affiliate",
};

export const getDashboardPathForRole = (role?: string | null): string => {
    const normalizedRole = normalizeRole(role);
    return normalizedRole ? dashboardPathByRole[normalizedRole] : "/onboarding";
};

export const rolesMatch = (actualRole?: string | null, expectedRole?: string | null): boolean => {
    return normalizeRole(actualRole) === normalizeRole(expectedRole);
};
