import { useEffect, useState } from "react";

export const useOnboarding = () => {
    const [step, setStep] = useState(1);

    useEffect(() => {
        const saved = localStorage.getItem("onboardingStep");
        if (saved) setStep(Number(saved));
    }, []);

    const updateStep = (s: number) => {
        setStep(s);
        localStorage.setItem("onboardingStep", String(s));
    };

    const complete = () => {
        localStorage.removeItem("onboardingStep");
    };

    return { step, updateStep, complete };
};