import { supabase } from "@/utils/supabase/supabase-client";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (document.getElementById("razorpay-script")) {
            return resolve(true);
        }

        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const initiateRazorpayPayment = async (
    plan: string,
    amount: number,
    user: any
) => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
        alert("Failed to load Razorpay SDK.");
        return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // 🧪 DUMMY MODE FOR TESTING (If no key found)
    if (!razorpayKey || razorpayKey === "your_razorpay_key_id") {
        console.warn("Razorpay Key missing - Using Dummy Payment Mode");
        const confirmPayment = window.confirm(
            `[TEST MODE] Simulate successful payment for ${plan} (₹${amount})?`
        );

        if (confirmPayment) {
            alert("Subscription activated successfully (Dummy Mode)!");
            window.location.href = "/dashboard";
        }
        return;
    }

    const options = {
        key: razorpayKey,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "SUITCASE",
        description: `${plan} Subscription`,
        image: "/logo.png",
        handler: async function (response: any) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
                response;

            const { data, error } = await supabase.functions.invoke(
                "verify-razorpay",
                {
                    body: {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature,
                        plan,
                        amount,
                        user_id: user.id,
                    },
                }
            );

            if (error) {
                alert("Payment verification failed.");
                console.error(error);
                return;
            }

            if (data?.success) {
                alert("Subscription activated successfully!");
                window.location.href = "/dashboard";
            } else {
                alert("Payment verification failed.");
            }
        },
        prefill: {
            name: user?.email,
            email: user?.email,
        },
        theme: {
            color: "#2563eb",
        },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
};



