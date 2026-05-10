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
    return role === ROLES.ADMIN || role === ROLES.ADVOCATE;
};

export const isClientSide = (role: Role) => {
    return role === ROLES.CLIENT || role === ROLES.LITIGENT;
};