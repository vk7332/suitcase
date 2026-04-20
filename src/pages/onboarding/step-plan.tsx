export default function StepPlan({ next }: any) {
    return (
        <div>
            <h2 className="mb-4">Choose Plan</h2>

            {[
                { name: "Free", price: "₹0" },
                { name: "Pro", price: "₹299" },
                { name: "Premium", price: "₹699" },
            ].map((p) => (
                <div key={p.name} className="border p-3 mb-2">
                    <h3>{p.name}</h3>
                    <p>{p.price}</p>

                    <button
                        onClick={() => next({ plan: p.name })}
                        className="mt-2 bg-black text-white px-2 py-1"
                    >
                        Select
                    </button>
                </div>
            ))}
        </div>
    );
}