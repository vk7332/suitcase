import FeatureGate from "../components/common/FeatureGate";

export default function DocumentsPage() {
    return (
        <FeatureGate
            requiredPlan="PRO"
            featureName="Document Management"
        >
            <div>
                <h1 className="text-2xl font-bold mb-4">
                    Document Management
                </h1>
                {/* Document Upload Component */}
            </div>
        </FeatureGate>
    );
}


