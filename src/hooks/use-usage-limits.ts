import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";
import { useSubscription } from "./use-subscription";
import { PLAN_LIMITS } from "../config/plan-limits";
import { getDailyUsage, incrementUsage } from "../services/usage-service";


export const useUsageLimits = () => {
    const { user } = useAuth();
    const subscription = useSubscription();
    const [aiDraftsUsed, setAiDraftsUsed] = useState(0);

    useEffect(() => {
        if (user) {
            fetchUsage();
        }
    }, [user]);

    const fetchUsage = async () => {
        if (!user) return;
        const used = await getDailyUsage(user.id, "AI_DRAFT");
        setAiDraftsUsed(used);
    };

    const limits = PLAN_LIMITS[subscription.plan] || PLAN_LIMITS.FREE;

    const canUseAIDraft =
        aiDraftsUsed < limits.aiDraftsPerDay ||
        subscription.plan === "PREMIUM";

    const recordAIDraftUsage = async () => {
        if (!user) return;
        await incrementUsage(user.id, "AI_DRAFT");
        setAiDraftsUsed((prev) => prev + 1);
    };

    return {
        aiDraftsUsed,
        aiDraftsLimit: limits.aiDraftsPerDay,
        canUseAIDraft,
        recordAIDraftUsage,
        plan: subscription.plan,
    };
};


