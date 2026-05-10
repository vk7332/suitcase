import { useNavigate } from "react-router-dom";

export default function StepSuccess() {
    const navigate = useNavigate();

    const handleFinish = () => {
        localStorage.setItem("onboardingComplete", "true");
        navigate("/dashboard");
    };

    return (
        <div className="text-center">
            <h2 className="text-xl mb-4">
                You're Ready 🚀
            </h2>

            <button
                onClick={handleFinish}
                className="bg-black text-white px-4 py-2"
            >
                Go to Dashboard
            </button>
        </div>
    );
}
