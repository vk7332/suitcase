import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function SubscriptionGuard({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    navigate("/login");
                    return;
                }

                // 🚀 BYPASS FOR DEMO USER
                if (user.email === "demo@suitcase.com") {
                    setLoading(false);
                    return;
                }

                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("subscription_plan, trial_used")
                    .eq("id", user.id)
                    .single();

                if (error || !profile) {
                    // If no profile, redirect to onboarding
                    navigate("/onboarding");
                    return;
                }

                // If user has a plan (including free) or has used a trial, let them in
                // Otherwise redirect to onboarding
                const hasPlan = profile.subscription_plan && profile.subscription_plan !== "";
                
                if (!hasPlan && !profile.trial_used) {
                    console.log("No plan found, redirecting to onboarding");
                    navigate("/onboarding");
                    return;
                }

                setLoading(false);
            } catch (err) {
                console.error("Subscription check failed:", err);
                navigate("/login");
            }
        };

        check();
    }, [navigate]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#089CCE] mb-4"></div>
            <p className="text-gray-600 font-medium">Checking subscription...</p>
        </div>
    );

    return children;
}
