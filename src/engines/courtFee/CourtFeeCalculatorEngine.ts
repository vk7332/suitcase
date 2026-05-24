import { courtFeeStates } from "@/data/court-fees";
import { calculateProgressiveFee, calculateFlatFee, calculatePerUnitFee } from "./CourtFeeSlabEngine";

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
        const config = stateData.scheduleI;
        switch (config.calculationType) {
            case "progressive":
                return calculateProgressiveFee(config, amount);
            case "flat":
                return calculateFlatFee(config.slabs, amount);
            case "per_unit":
                return calculatePerUnitFee(config, amount);
            default:
                throw new Error("invalid calculation type");
        }
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
