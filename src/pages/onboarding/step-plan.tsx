export default function StepPlan({ next }: any) {
    const plans = [
        { name: "Free", price: "₹0", features: ["Basic Case Tracking", "5 Documents", "Standard Support"] },
        { name: "Pro", price: "₹199", features: ["Unlimited Cases", "Advanced Billing", "Priority Support", "AI Assistant"], recommended: true },
        { name: "Premium", price: "₹499", features: ["Full Office Suite", "Multi-user Access", "24/7 Support", "Advanced AI Drafts"] },
    ];

    return (
        <div className="w-full max-w-4xl bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
                <p className="text-gray-500">Select a plan that scales with your legal practice</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p) => (
                    <div 
                        key={p.name} 
                        className={`relative border-2 rounded-3xl p-8 transition-all duration-300 ${
                            p.recommended ? "border-[#089CCE] bg-blue-50/30 scale-105 shadow-xl shadow-blue-100" : "border-gray-100 hover:border-gray-200"
                        }`}
                    >
                        {p.recommended && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#089CCE] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                Recommended
                            </div>
                        )}
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                            <div className="mt-4 flex items-baseline justify-center">
                                <span className="text-4xl font-extrabold tracking-tight text-gray-900">{p.price}</span>
                                <span className="ml-1 text-xl font-semibold text-gray-500">/mo</span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {p.features.map((f, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-[#089CCE] mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => next({ plan: p.name.toLowerCase() })}
                            className={`w-full py-4 rounded-xl font-bold transition-all ${
                                p.recommended 
                                    ? "bg-[#089CCE] text-white hover:bg-[#078bb8] shadow-lg shadow-[#089CCE]/20" 
                                    : "bg-gray-900 text-white hover:bg-gray-800"
                            }`}
                        >
                            Select Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
