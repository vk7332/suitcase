export type UserRole = "ADVOCATE" | "CLIENT";

export interface Affiliate {
    id: string;
    user_id: string;
    referral_code: string;
    role: UserRole;
    total_earnings: number;
    created_at: string;
}

export interface Referral {
    id: string;
    referred_user_id: string;
    status: string;
    created_at: string;
}

export interface Commission {
    id: string;
    amount: number;
    plan: string;
    status: string;
    created_at: string;
}

export interface Affiliate {
    id: string;
    user_id: string;
    referral_code: string;
    role: "ADVOCATE" | "CLIENT";
    total_earnings: number;
    created_at: string;
}

export interface Commission {
    id: string;
    referrer_id: string;
    referred_user_id: string;
    amount: number;
    plan: string;
    status: "pending" | "approved" | "paid";
    created_at: string;
}

export interface PayoutRequest {
    id: string;
    user_id: string;
    amount: number;
    status: "pending" | "approved" | "rejected" | "paid";
    created_at: string;
}


