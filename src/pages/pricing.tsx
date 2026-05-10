import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
    const navigate = useNavigate();

    useEffect(() => {
        const plan = localStorage.getItem("selectedPlan");

        if (plan) {
            // optional auto-highlight or auto-trigger
            console.log("Retry plan:", plan);
            localStorage.removeItem("selectedPlan");
            handleSubscribe(plan);
        }

        if (!localStorage.getItem("onboardingComplete")) {
            navigate("/onboarding");
        }

    }, [navigate]);

    const plans = [
        {
            name: "Free",
            price: "₹0",
            features: [
                "Up to 5 cases",
                "Basic calculator",
                "Limited storage",
            ],
            action: () => alert("Free plan active"),
        },
        {
            name: "Pro",
            price: "₹299/month",
            features: [
                "Up to 30 cases",
                "PDF export",
                "Document storage",
                "Client portal",
                "Email notifications",
            ],
            action: () => handleSubscribe("plan_pro_id"),
        },
        {
            name: "Premium",
            price: "₹699/month",
            features: [
                "Unlimited cases",
                "Advanced sharing",
                "SMS notifications",
                "Analytics",
                "Automation",
            ],
            action: () => handleSubscribe("plan_premium_id"),
        },
    ];

    const handleSubscribe = async (planId: string) => {
        const res = await fetch("/api/subscription/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ planId }),
        });

        const data = await res.json();

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            subscription_id: data.id,
            name: "SUITCASE",

            handler: function () {
                // ✅ success redirect
                window.location.href = "/payment-success";
            },

            modal: {
                ondismiss: function () {
                    // ❌ user closed payment
                    window.location.href = "/payment-failed";
                },
            },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    const handleUpgrade = async (plan: string) => {
        const res = await fetch("/api/subscription/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ plan }),
        });

        const data = await res.json();

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            subscription_id: data.id,

            handler: function () {
                window.location.href = "/payment-success";
            },

            modal: {
                ondismiss: function () {
                    window.location.href = "/payment-failed";
                },
            },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    return (
        <div className="min-h-screen p-10">

            <h1 className="text-3xl font-bold text-center mb-10">
                Pricing Plans
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="border p-6 rounded text-center"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {plan.name}
                        </h2>

                        <p className="text-2xl mb-4">{plan.price}</p>

                        <ul className="mb-6 space-y-2">
                            {plan.features.map((f) => (
                                <li key={f}>{f}</li>
                            ))}
                        </ul>

                        <button
                            onClick={plan.action}
                            className="bg-black text-white px-4 py-2 rounded"
                        >
                            Choose Plan
                        </button>
                        <button
                            onClick={() => handleUpgrade("pro")}
                            className="bg-blue-600 text-white px-4 py-2 mt-3"
                        >
                            Upgrade to Pro
                        </button>

                        <button
                            onClick={() => handleUpgrade("premium")}
                            className="bg-blue-600 text-white px-4 py-2 mt-3"
                        >
                            Upgrade to Premium
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}
