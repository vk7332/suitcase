import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getUserSubscription } from "../services/SubscriptionService";
import { Subscription } from "../types/subscription";

export const useSubscription = () => {
    const { user } = useAuth();
    const [subscription, setSubscription] =
        useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscription = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            const data = await getUserSubscription(user.id);
            setSubscription(data);
            setLoading(false);
        };

        fetchSubscription();
    }, [user]);

    return {
        subscription,
        plan: subscription?.plan || "FREE",
        loading,
    };
};
