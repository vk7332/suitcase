import { useNavigate } from "react-router-dom";

export default function StepSuccess() {
    const navigate = useNavigate();

    return (
        <div className="text-center">
            <h2 className="text-xl mb-4">
                You're Ready 🚀
            </h2>

            <button
                onClick={() => navigate("/dashboard")}
                className="bg-black text-white px-4 py-2"
            >
                Go to Dashboard
            </button>
        </div>
    );
}