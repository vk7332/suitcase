import React from "react";
import { useSubscription } from "../../hooks/useSubscription";
import { hasFeatureAccess } from "../../middleware/featureGuard";

interface Props {
    requiredPlan: "FREE" | "PRO" | "PREMIUM";
    children: React.ReactNode;
    featureName?: string;
}

const FeatureGate: React.FC<Props> = ({
    requiredPlan,
    children,
    featureName = "this feature",
}) => {
    const { plan, loading } = useSubscription();

    if (loading) return <p>Checking access...</p>;

    const allowed = hasFeatureAccess(plan, requiredPlan);

    if (!allowed) {
        return (
            <div className="border rounded-lg p-4 bg-red-50 text-center">
                <h3 className="text-lg font-semibold text-red-600">
                    Upgrade Required
                </h3>
                <p className="text-sm text-gray-600">
                    Please upgrade to access {featureName}.
                </p>
                <a
                    href="/subscription"
                    className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Upgrade Now
                </a>
            </div>
        );
    }

    return <>{children}</>;
};

export default FeatureGate;


