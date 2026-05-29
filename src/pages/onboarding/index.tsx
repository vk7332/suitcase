import { useState, useEffect } from "react";
import StepRole from "./StepRole";
import StepProfile from "./StepProfile";
import StepPlan from "./StepPlan";
import StepFirstCase from "./StepFirstCase";
import StepSuccess from "./StepSuccess";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("onboardingComplete") === "true") {
            navigate("/dashboard");
        }
    }, [navigate]);

    const next = (newData?: any) => {
        setData({ ...data, ...newData });
        setStep((s) => s + 1);
    };

    const totalSteps = 5;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#089CCE] p-6">
            <div className="w-full max-w-xl mb-12">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                        <span className="text-[#089CCE] font-black text-3xl">S</span>
                    </div>
                </div>
                <ProgressBar currentStep={step} totalSteps={totalSteps} />
            </div>

            <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && <StepRole next={next} />}
                {step === 2 && <StepProfile next={next} />}
                {step === 3 && <StepPlan next={next} />}
                {step === 4 && <StepFirstCase next={next} />}
                {step === 5 && <StepSuccess />}
            </div>
        </div>
    );
}
