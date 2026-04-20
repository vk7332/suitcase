export type UserRole =
    | "admin"
    | "advocate"
    | "junior_advocate"
    | "staff"
    | "client"
    | "litigant"
    | "public";

export const ROLES = {
    ADMIN: "admin" as UserRole,
    ADVOCATE: "advocate" as UserRole,
    JUNIOR_ADVOCATE: "junior_advocate" as UserRole,
    STAFF: "staff" as UserRole,
    CLIENT: "client" as UserRole,
    LITIGANT: "litigant" as UserRole,
    PUBLIC: "public" as UserRole,
};


