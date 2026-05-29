import { PlanType } from "../types/subscription";

export const hasFeatureAccess = (
    userPlan: PlanType,
    requiredPlan: PlanType
): boolean => {
    const hierarchy: Record<PlanType, number> = {
        FREE: 0,
        PRO: 1,
        PREMIUM: 2,
        CHAMBER: 3,
    };

    return hierarchy[userPlan] >= hierarchy[requiredPlan];
}


