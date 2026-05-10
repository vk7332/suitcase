import { useNavigate } from "react-router-dom";

export default function StepSuccess() {
    const navigate = useNavigate();

    const handleFinish = () => {
        localStorage.setItem("onboardingComplete", "true");
        navigate("/dashboard");
    };

    return (
        <div className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-inner">
                ✓
            </div>
            
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                You're All Set! 🚀
            </h2>
            
            <p className="text-gray-500 mb-10 leading-relaxed">
                Your SUITCASE Advocate Operating System is ready. 
                Welcome to the future of legal practice management.
            </p>

            <button
                onClick={handleFinish}
                className="w-full bg-[#089CCE] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#078bb8] transition shadow-xl shadow-[#089CCE]/20 active:scale-95"
            >
                Enter Dashboard
            </button>
        </div>
    );
}
