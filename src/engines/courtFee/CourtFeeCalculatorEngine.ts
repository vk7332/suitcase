import { courtFeeStates } from "@/data/court-fees";
import { calculateProgressiveFee } from "./courtFeeSlabEngine";

export const calculateCourtFee = ({
    state,
    type, // scheduleI | scheduleII
    amount,
    category,
}: any) => {
    const stateData = courtFeeStates[state];

    if (!stateData) throw new Error("invalid state");

    // 🧾 Schedule I
    if (type === "scheduleI") {
        return calculateProgressiveFee(stateData.scheduleI, amount);
    }

    // 📄 Schedule II
    if (type === "scheduleII") {
        const base = stateData.scheduleII[category] || 0;

        const additional =
            stateData.additional?.[category] ||
            (category === "vakalatnama"
                ? stateData.additional?.advocateWelfare || 0
                : 0);

        return {
            courtFee: base,
            additionalCharges: additional,
            total: base + additional,
        };
    }
};