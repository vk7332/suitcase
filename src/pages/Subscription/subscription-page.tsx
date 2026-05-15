import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function SubscriptionPage() {
    const navigate = useNavigate();
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("subscription_plan")
                    .eq("id", user.id)
                    .single();
                
                if (profile?.subscription_plan === "premium") {
                    setIsPremium(true);
                }
            }
        } catch (err) {
            console.error("Error checking status:", err);
        } finally {
            setLoading(false);
        }
    };

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
                description: "₹699 Monthly Subscription",

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

    if (loading) return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;

    if (isPremium) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                {/* Fixed Top Header */}
                <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition font-bold text-[#089CCE]"
                        >
                            <div className="w-6 h-6 bg-[#089CCE] rounded flex items-center justify-center text-white text-xs">S</div>
                            SUITCASE
                        </button>
                        <div className="h-6 w-px bg-gray-200"></div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition font-medium"
                        >
                            <ArrowLeft size={20} />
                            Back
                        </button>
                    </div>
                    
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-[#089CCE] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#078bb8] transition shadow-md shadow-[#089CCE]/10"
                    >
                        Go to Dashboard
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                    <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center max-w-2xl w-full mb-12">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#089CCE]">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Premium Services</h2>
                        <p className="text-gray-500 mb-10 leading-relaxed">
                            You are already on the **SUITCASE Premium Plan**. Here are the exclusive services active on your account:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            {[
                                { title: "AI Draft Generator", desc: "Generate complex legal documents in seconds" },
                                { title: "Unlimited Case Storage", desc: "Manage your entire portfolio without limits" },
                                { title: "Advanced Calculators", desc: "Court Fee, Limitation, Stamp Duty & more" },
                                { title: "Client Ledger Pro", desc: "Detailed financial tracking for every client" },
                                { title: "24/7 Priority Support", desc: "Dedicated help desk for premium members" },
                                { title: "Cloud Document Library", desc: "Securely store and access templates anywhere" }
                            ].map((feat, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <h4 className="font-bold text-gray-900 text-sm mb-1">{feat.title}</h4>
                                    <p className="text-xs text-gray-500">{feat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="absolute top-8 left-8 flex items-center gap-4">
                <button 
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition font-bold text-[#089CCE]"
                >
                    <div className="w-6 h-6 bg-[#089CCE] rounded flex items-center justify-center text-white text-xs">S</div>
                    SUITCASE
                </button>
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center max-w-md w-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Upgrade to Pro</h2>
                <p className="text-gray-500 mb-8">
                    ₹699/month after free trial
                </p>

                <button
                    onClick={handlePayment}
                    className="w-full bg-[#089CCE] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20"
                >
                    Subscribe ₹699
                </button>
                
                <button 
                    onClick={() => navigate("/dashboard")}
                    className="mt-6 text-sm font-bold text-gray-400 hover:text-gray-600 transition"
                >
                    Continue with Free Plan
                </button>
            </div>
        </div>
    );
}
