import { startSubscription } from "@/engines/billing/billing.engine";

export default function Pricing() {
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
            action: () => startSubscription("plan_pro_id"),
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
            action: () => startSubscription("plan_premium_id"),
        },
    ];

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
                    </div>
                ))}
            </div>

        </div>
    );
}