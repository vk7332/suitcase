import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        // small delay → better UX
        setTimeout(() => {
            navigate("/onboarding");
        }, 2000);
    }, []);

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-green-600">
                Payment Successful 🎉
            </h1>
            <p>Redirecting to onboarding...</p>
        </div>
    );
}
