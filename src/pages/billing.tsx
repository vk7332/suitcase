export default function BillingPage() {
    const plans = [
        { name: "pro", price: "₹999/month" },
        { name: "enterprise", price: "₹2999/month" },
    ];

    const subscribe = async (plan: string) => {
        const res = await fetch("/api/billing/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ plan }),
        });

        const data = await res.json();

        const rzp = new (window as any).Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY,
            subscription_id: data.id,
        });

        rzp.open();
    };

    return (
        <div className="p-6">
            <h1>Upgrade Plan</h1>

            {plans.map((p) => (
                <div key={p.name} className="border p-4 mb-2">
                    <h2>{p.name.toUpperCase()}</h2>
                    <p>{p.price}</p>

                    <button onClick={() => subscribe(p.name)}>
                        Upgrade
                    </button>
                </div>
            ))}
        </div>
    );
}