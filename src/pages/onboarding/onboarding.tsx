import { useState } from "react";
import StepRole from "./step-role";
import StepProfile from "./step-profile";
import StepPlan from "./step-plan";
import StepFirstCase from "./step-first-case";
import StepSuccess from "./step-success";
import ProgressBar from "@/components/onboarding/progressBar";

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<any>({});

    const next = (newData?: any) => {
        setData({ ...data, ...newData });
        setStep((s) => s + 1);
    };

    const totalSteps = 5;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <ProgressBar currentStep={step} totalSteps={totalSteps} />

            {step === 1 && <StepRole next={next} />}
            {step === 2 && <StepProfile next={next} />}
            {step === 3 && <StepPlan next={next} />}
            {step === 4 && <StepFirstCase next={next} />}
            {step === 5 && <StepSuccess />}

        </div>
    );
}
