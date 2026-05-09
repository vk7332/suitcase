import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-red-600">
                Payment Failed ❌
            </h1>

            <button
                onClick={() => navigate("/pricing")}
                className="mt-4 bg-blue-600 text-white px-4 py-2"
            >
                Try Again
            </button>
        </div>
    );
}