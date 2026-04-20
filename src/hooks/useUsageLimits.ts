import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { Link } from "react-router-dom";
import { useSubscription } from "./useSubscription";
import { PLAN_LIMITS } from "../config/planLimits";
import { getDailyUsage, incrementUsage } from "../services/UsageService";


export const useUsageLimits = () => {
    const { user } = useAuth();
    const { plan } = useSubscription();
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

    const canUseAIDraft =
        aiDraftsUsed < PLAN_LIMITS[plan].aiDraftsPerDay ||
        plan === "PREMIUM";

    const recordAIDraftUsage = async () => {
        if (!user) return;
        await incrementUsage(user.id, "AI_DRAFT");
        setAiDraftsUsed((prev) => prev + 1);
    };

    return {
        aiDraftsUsed,
        aiDraftsLimit: PLAN_LIMITS[plan].aiDraftsPerDay,
        canUseAIDraft,
        recordAIDraftUsage,
        plan,
    };
};


