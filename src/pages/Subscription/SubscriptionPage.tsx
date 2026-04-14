import { PRICING_PLANS } from "../../config/pricingPlans";
import { initiateRazorpayPayment } from "../../services/RazorpayService";
import { useAuth } from "../../hooks/useAuth";

export default function SubscriptionPage() {
    const { user } = useAuth();

    const handleSubscribe = (plan: string, price: number) => {
        if (!user) {
            alert("Please login first.");
            return;
        }

        if (price === 0) {
            alert("You are already on the Free plan.");
            return;
        }

        initiateRazorpayPayment(plan, price, user);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                SUITCASE Subscription Plans
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                {PRICING_PLANS.map((plan) => (
                    <div key={plan.name} className="border rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-center">{plan.name}</h2>
                        <p className="text-center text-2xl font-semibold my-4">
                            {plan.price === 0 ? "Free" : `₹${plan.price}/month`}
                        </p>

                        <ul className="mb-4 space-y-2">
                            {plan.features.map((feature, index) => (
                                <li key={index}>✔ {feature}</li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSubscribe(plan.name, plan.price)}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg"
                        >
                            {plan.price === 0 ? "Current Plan" : "Subscribe"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
