import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export type PlanType = "FREE" | "PRO" | "PREMIUM" | "CHAMBER";

export const useSubscription = () => {
    const [subscription, setSubscription] = useState<{
        status: string;
        plan: PlanType;
        expired: boolean;
        loading: boolean;
    }>({
        status: "active",
        plan: "FREE",
        expired: false,
        loading: true,
    });

    useEffect(() => {
        const fetchSub = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setSubscription(prev => ({ ...prev, loading: false }));
                    return;
                }

                // Fetch profile for subscription_plan field
                const { data: profile, error: profileError } = await supabase
                    .from("profiles")
                    .select("subscription_plan, trial_used, trial_end_date")
                    .eq("id", user.id)
                    .single();

                if (profileError) {
                    console.error("Profile fetch error:", profileError.message);
                    // Default to FREE on error
                    setSubscription({ status: "active", plan: "FREE", expired: false, loading: false });
                    return;
                }

                if (profile?.subscription_plan) {
                    const planMap: Record<string, PlanType> = {
                        "free": "FREE",
                        "pro": "PRO",
                        "premium": "PREMIUM",
                        "chamber": "CHAMBER",
                        "starter": "FREE",
                    };
                    const normalizedPlan = (planMap[profile.subscription_plan.toLowerCase()] || "FREE") as PlanType;
                    
                    setSubscription({
                        status: "active",
                        plan: normalizedPlan,
                        expired: profile.trial_end_date ? new Date(profile.trial_end_date) < new Date() : false,
                        loading: false,
                    });
                } else {
                    setSubscription({ status: "active", plan: "FREE", expired: false, loading: false });
                }
            } catch (e) {
                console.error("Failed to fetch subscription:", e);
                // Default to FREE on any error
                setSubscription({ status: "active", plan: "FREE", expired: false, loading: false });
            }
        };

        fetchSub();
    }, []);

    return subscription;
};
