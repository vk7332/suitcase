import { courtFeeStates } from "../../data/court-fees";
// Inline slab calculation helpers to avoid missing module import
const calculateProgressiveFee = (config: any, amount: number) => {
    // expect config.slabs = [{ upto?: number, rate: number }] progressive tiers
    if (!config?.slabs || !Array.isArray(config.slabs)) throw new Error("invalid progressive config");
    let remaining = amount;
    let fee = 0;
    for (const slab of config.slabs) {
        const cap = typeof slab.upto === "number" ? slab.upto : Infinity;
        const take = Math.min(remaining, cap);
        if (take <= 0) break;
        fee += take * (slab.rate ?? 0);
        remaining -= take;
    }
    return fee;
};

const calculateFlatFee = (slabs: any, amount: number) => {
    // expect slabs = [{ from?: number, to?: number, fee: number }]
    if (!Array.isArray(slabs)) throw new Error("invalid flat config");
    const slab = slabs.find((s: any) => {
        const fromOk = typeof s.from !== "number" || amount >= s.from;
        const toOk = typeof s.to !== "number" || amount <= s.to;
        return fromOk && toOk;
    });
    if (!slab) throw new Error("no matching flat slab");
    return slab.fee ?? 0;
};

const calculatePerUnitFee = (config: any, amount: number) => {
    // expect config.unit and config.rate
    const unit = config?.unit ?? 1;
    const rate = config?.rate ?? 0;
    return Math.ceil(amount / unit) * rate;
};


export const calculateCourtFee = ({
    state,
    type, // scheduleI | scheduleII
    amount,
    category,
}: {
    state: keyof typeof courtFeeStates;
    type: "scheduleI" | "scheduleII";
    amount: number;
    category?: string;
}) => {
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
        if (!category) throw new Error("category required for scheduleII");

        const base = stateData.scheduleII[category as keyof typeof stateData.scheduleII] || 0;
        const additionalConfig = (stateData as {
            additional?: Record<string, number> & { advocateWelfare?: number };
        }).additional;

        const additional =
            additionalConfig?.[category] ||
            (category === "vakalatnama"
                ? additionalConfig?.advocateWelfare || 0
                : 0);

        return {
            courtFee: base,
            additionalCharges: additional,
            total: base + additional,
        };
    }
};
