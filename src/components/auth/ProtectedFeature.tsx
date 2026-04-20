import React from "react";
import { hasPremiumAccess } from "@/utils/subscriptionUtils";

interface Props {
    plan: string;
    trialEndDate: string | null;
    children: React.ReactNode;
}

const ProtectedFeature: React.FC<Props> = ({
    plan,
    trialEndDate,
    children,
}) => {
    if (!hasPremiumAccess(plan, trialEndDate)) {
        return (
            <div className="p-4 border rounded bg-yellow-50">
                This feature is available only for Pro and Premium users.
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedFeature;


