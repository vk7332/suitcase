import React from "react";

interface Props {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressBar({
    currentStep,
    totalSteps,
}: Props) {
    const percentage = Math.round((currentStep / totalSteps) * 100);

    return (
        <div className="w-full max-w-xl mb-6">

            {/* TEXT */}
            <div className="flex justify-between text-xs mb-1 text-gray-500">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{percentage}%</span>
            </div>

            {/* BAR */}
            <div className="w-full h-2 bg-gray-200 rounded">

                <div
                    className="h-2 bg-black rounded transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />

            </div>
        </div>
    );
}