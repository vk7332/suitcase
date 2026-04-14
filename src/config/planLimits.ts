import { PlanType, UsageLimits } from "../types/subscription";

export const PLAN_LIMITS: Record<PlanType, UsageLimits> = {
    FREE: {
        aiDraftsPerDay: 2,
        documents: 10,
        juniors: 0,
    },
    PRO: {
        aiDraftsPerDay: 20,
        documents: 500,
        juniors: 2,
    },
    PREMIUM: {
        aiDraftsPerDay: -1, // Unlimited
        documents: -1, // Unlimited
        juniors: 5,
    },
};
