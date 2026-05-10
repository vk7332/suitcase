export type UserRole =
    | "admin"
    | "advocate"
    | "junior advocates"
    | "staff(clerks)"
    | "client"
    | "litigant"
    | "public";

export const ROLES = {
    ADMIN: "admin" as UserRole,
    ADVOCATE: "advocate" as UserRole,
    JUNIOR_ADVOCATE: "junior advocates" as UserRole,
    STAFF: "staff(clerks)" as UserRole,
    CLIENT: "client" as UserRole,
    LITIGANT: "litigant" as UserRole,
    PUBLIC: "public" as UserRole,
};


