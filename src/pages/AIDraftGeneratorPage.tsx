import UsageLimitAlert from "../components/common/UsageLimitAlert";
import { useUsageLimits } from "../hooks/useUsageLimits";

export default function AIDraftGeneratorPage() {
    const {
        aiDraftsUsed,
        aiDraftsLimit,
        canUseAIDraft,
        recordAIDraftUsage,
        plan,
    } = useUsageLimits();

    const handleGenerateDraft = async () => {
        if (!canUseAIDraft) return;
        await recordAIDraftUsage();
        alert("AI Draft Generated Successfully!");
    };

    if (!canUseAIDraft) {
        return (
            <UsageLimitAlert
                message={`Daily limit reached. You used ${aiDraftsUsed}/${aiDraftsLimit} drafts. Upgrade your plan.`}
            />
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">AI Draft Generator</h1>
            <p className="text-gray-600 mb-4">
                Plan: {plan} | Used: {aiDraftsUsed}/{aiDraftsLimit}
            </p>

            <button
                onClick={handleGenerateDraft}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Generate AI Draft
            </button>
        </div>
    );
}


