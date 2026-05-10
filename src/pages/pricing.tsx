import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function Pricing() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<string | null>(null);
    const [currentPlan, setCurrentPlan] = useState<string>("");

    useEffect(() => {
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/login");
                return;
            }

            const { data: profile } = await supabase
                .from("profiles")
                .select("subscription_plan")
                .eq("id", user.id)
                .single();
            
            if (profile) {
                setCurrentPlan(profile.subscription_plan || "free");
            }
        };

        checkSession();
    }, [navigate]);

    const plans = [
        {
            id: "free",
            name: "Free",
            price: "₹0",
            features: [
                "Up to 5 cases",
                "Basic legal calculator",
                "Limited cloud storage",
                "Standard email support",
            ],
            color: "gray",
        },
        {
            id: "pro",
            name: "Pro",
            price: "₹299",
            features: [
                "Up to 30 cases",
                "Advanced PDF exports",
                "Secure document storage",
                "Dedicated client portal",
                "Email & SMS notifications",
            ],
            color: "blue",
            recommended: true,
        },
        {
            id: "premium",
            name: "Premium",
            price: "₹699",
            features: [
                "Unlimited cases",
                "Advanced team sharing",
                "Full automation suite",
                "Deep practice analytics",
                "24/7 Priority support",
            ],
            color: "indigo",
        },
    ];

    const handleSelectPlan = async (planId: string) => {
        console.log("Selecting plan:", planId);
        if (planId === currentPlan) {
            console.log("Already on this plan, going to dashboard");
            navigate("/dashboard");
            return;
        }

        setLoading(planId);
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                console.error("Auth error:", authError);
                navigate("/login");
                return;
            }

            console.log("Updating profile for user:", user.id);
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ 
                    subscription_plan: planId,
                    trial_used: true // Mark trial as used when selecting any plan
                })
                .eq("id", user.id);

            if (updateError) {
                console.error("Update error:", updateError);
                throw updateError;
            }

            console.log("Plan updated successfully, navigating...");
            navigate("/payment-success");
        } catch (err: any) {
            console.error("Plan selection failed:", err);
            alert("Error: " + (err.message || "Failed to update plan. Please check if the database table has the required columns."));
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the plan that fits your practice size. Scale up as your chamber grows.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white p-10 rounded-[2.5rem] shadow-xl border-2 transition-all duration-300 flex flex-col ${
                                plan.recommended 
                                    ? "border-[#089CCE] scale-105 z-10" 
                                    : "border-transparent hover:border-gray-200"
                            }`}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#089CCE] text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {plan.name}
                                </h2>
                                <div className="flex items-baseline">
                                    <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                                    <span className="text-gray-500 ml-1 font-semibold">/month</span>
                                </div>
                            </div>

                            <ul className="mb-10 space-y-4 flex-grow">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-gray-600 font-medium">
                                        <svg className="w-5 h-5 text-[#089CCE] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSelectPlan(plan.id)}
                                disabled={loading !== null}
                                className={`w-full py-5 rounded-2xl font-bold text-lg transition transform active:scale-95 ${
                                    plan.id === currentPlan
                                        ? "bg-green-100 text-green-700 cursor-default"
                                        : plan.recommended
                                        ? "bg-[#089CCE] text-white hover:bg-[#078bb8] shadow-lg shadow-blue-200"
                                        : "bg-gray-900 text-white hover:bg-gray-800"
                                }`}
                            >
                                {loading === plan.id ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Processing...
                                    </div>
                                ) : plan.id === currentPlan ? (
                                    "Current Plan"
                                ) : plan.id === "free" ? (
                                    "Get Started"
                                ) : (
                                    "Choose " + plan.name
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-gray-500 font-medium">
                        All plans include 30 days free trial. No credit card required.
                    </p>
                </div>
            </div>
        </div>
    );
}
