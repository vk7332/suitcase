import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function SubscriptionPage() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        try {
            // 🔐 Get user
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("Please login first");
                return;
            }

            // 💳 Create order
            const res = await fetch("/api/create-order", {
                method: "POST",
            });

            const order = await res.json();

            // 💳 Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: "INR",
                order_id: order.id,

                name: "SUITCASE",
                description: "₹499 Monthly Subscription",

                handler: async function (response: any) {

                    // 🔐 VERIFY PAYMENT
                    await fetch("/api/verify-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: user.id,
                        }),
                    });

                    alert("Subscription Activated");
                    window.location.href = "/";
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error(err);
            alert("Payment failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="bg-white p-6 shadow rounded w-96 text-center">

                <h2 className="text-xl font-bold mb-4">
                    Upgrade to Pro
                </h2>

                <p className="mb-4">
                    ₹499/month after free trial
                </p>

                <button
                    onClick={handlePayment}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    Subscribe ₹499
                </button>

            </div>

        </div>
    );
}