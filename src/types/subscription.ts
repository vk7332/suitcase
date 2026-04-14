export type PlanType = "FREE" | "PRO" | "PREMIUM";

export interface Subscription {
    id?: string;
    user_id: string;
    plan: PlanType;
    status: "active" | "inactive" | "cancelled";
    expires_at?: string;
    created_at?: string;
}

export interface UsageLimits {
    aiDraftsPerDay: number;
    documents: number;
    juniors: number;
}
