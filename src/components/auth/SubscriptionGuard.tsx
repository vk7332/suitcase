import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabase-client";

type SubscriptionGuardProps = {
    children: ReactNode;
};

export default function SubscriptionGuard({ children }: SubscriptionGuardProps) {
    const [loading, setLoading] = useState(true);
    const [timedOut, setTimedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Safety timeout to prevent infinite loading
        const timeoutId = window.setTimeout(() => {
            console.warn("SubscriptionGuard: Timeout after 5s, allowing user through");
            setTimedOut(true);
            setLoading(false);
        }, 5000);

        const check = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    navigate("/login");
                    clearTimeout(timeoutId);
                    return;
                }

                // 🚀 BYPASS FOR DEMO USER
                if (user.email === "demo@suitcase.com") {
                    setLoading(false);
                    clearTimeout(timeoutId);
                    return;
                }

                // Try fetching profile with all possible columns
                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    console.warn("Profile fetch error:", error.message, "- Allowing user through anyway");
                    setLoading(false);
                    clearTimeout(timeoutId);
                    return;
                }

                if (!profile) {
                    console.log("No profile found, redirecting to onboarding");
                    navigate("/onboarding");
                    clearTimeout(timeoutId);
                    return;
                }

                // Check if user has any plan or used a trial
                const hasPlan = profile.subscription_plan && profile.subscription_plan !== "" && profile.subscription_plan !== "free";
                const hasValidTrial = profile.trial_used && (!profile.trial_end_date || new Date(profile.trial_end_date) > new Date());
                const isFreeUser = profile.subscription_plan === "free" || profile.subscription_plan === null;
                
                // Allow FREE users, PREMIUM users, and those with trials
                if (isFreeUser || hasPlan || hasValidTrial) {
                    setLoading(false);
                    clearTimeout(timeoutId);
                    return;
                }

                // If no plan, redirect to onboarding
                console.log(
    "SUBSCRIPTION_GUARD_REDIRECT",
    {
        userId: user.id,
        profile
    }
);

navigate("/onboarding");
                clearTimeout(timeoutId);
            } catch (err) {
                console.error("Subscription check error:", err);
                // On error, allow through anyway - better to show dashboard than spinner
                setLoading(false);
                clearTimeout(timeoutId);
            }
        };

        check();

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    if (loading && !timedOut) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#089CCE] mb-4"></div>
            <p className="text-gray-600 font-medium">Checking subscription...</p>
        </div>
    );

    return children;
}
