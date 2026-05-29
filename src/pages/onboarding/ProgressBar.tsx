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
        <div className="w-full">
            {/* TEXT */}
            <div className="flex justify-between text-sm mb-3 font-bold text-white/90">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{percentage}%</span>
            </div>

            {/* BAR */}
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                <div
                    className="h-full bg-white rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
