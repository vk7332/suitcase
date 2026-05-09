export const ROLES = {
    ADMIN: "ADMIN",
    ADVOCATE: "ADVOCATE",
    CLIENT: "CLIENT",
    LITIGENT: "LITIGENT",
    PUBLIC: "PUBLIC",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// ✅ helper (optional but useful)
export const isInternalUser = (role: Role) => {
    return [ROLES.ADMIN, ROLES.ADVOCATE].includes(role);
};

export const isClientSide = (role: Role) => {
    return [ROLES.CLIENT, ROLES.LITIGENT].includes(role);
};