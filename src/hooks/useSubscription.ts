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

                const { data } = await supabase
                    .from("subscriptions")
                    .select("*")
                    .eq("user_id", user.id)
                    .single();

                if (data) {
                    setSubscription({
                        status: data.status,
                        plan: data.plan_type,
                        expired: new Date(data.end_date) < new Date(),
                        loading: false,
                    });
                } else {
                    setSubscription(prev => ({ ...prev, loading: false }));
                }
            } catch (e) {
                console.error("Failed to fetch subscription", e);
                setSubscription(prev => ({ ...prev, loading: false }));
            }
        };

        fetchSub();
    }, []);

    return subscription;
};
