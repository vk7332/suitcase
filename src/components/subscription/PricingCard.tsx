interface Props {
    plan: any;
    onSubscribe: (plan: string, price: number) => void;
}

export default function PricingCard({ plan, onSubscribe }: Props) {
    return (
        <div className="border rounded-xl shadow-lg p-6 bg-white">
            <h2 className="text-2xl font-bold text-center">{plan.name}</h2>
            <p className="text-center text-gray-500">{plan.description}</p>

            <h3 className="text-3xl font-bold text-center my-4">
                {plan.price === 0 ? "Free" : `₹${plan.price}/month`}
            </h3>

            <ul className="space-y-2">
                {plan.features.map((feature: string, index: number) => (
                    <li key={index}>✔ {feature}</li>
                ))}
            </ul>

            <button
                onClick={() => onSubscribe(plan.name, plan.price)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
                {plan.price === 0 ? "Current Plan" : "Subscribe"}
            </button>
        </div>
    );
}
