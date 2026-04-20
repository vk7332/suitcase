// src/engines/courtFee/courtFeeSlabEngine.ts

// 🔹 MAIN ENTRY
export const calculateCourtFeeByType = (config: any, amount: number) => {
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
};


// 🔹 PROGRESSIVE (HP / Punjab / Haryana)

export const calculateProgressiveFee = (config: any, amount: number) => {
    let remaining = amount;
    let previousLimit = 0;
    let total = 0;

    const breakdown: any[] = [];

    for (const slab of config.slabs) {
        let limit = slab.upto || amount;

        if (slab.above) limit = amount;

        const taxable = Math.min(remaining, limit - previousLimit);

        if (taxable <= 0) break;

        const fee = taxable * slab.rate;

        breakdown.push({
            range: `${previousLimit} - ${limit}`,
            amount: taxable,
            rate: slab.rate,
            fee,
        });

        total += fee;
        remaining -= taxable;
        previousLimit = limit;

        if (remaining <= 0) break;
    }

    return {
        total: applyPostRules(total, config),
        breakdown,
        rawTotal: total,
    };
};

// 🔹 FLAT (Delhi)
export const calculateFlatFee = (slabs: any[], amount: number) => {
    for (const slab of slabs) {
        if (slab.upto && amount <= slab.upto) {
            return slab.fee;
        }

        if (slab.above) {
            return slab.fee;
        }
    }

    return 0;
};


// 🔹 PER UNIT (UP / Rajasthan)
export const calculatePerUnitFee = (config: any, amount: number) => {
    const units = Math.ceil(amount / config.unit);
    const total = units * config.rate;

    return applyPostRules(total, config);
};


// 🔹 COMMON POST RULES (VERY IMPORTANT)
const applyPostRules = (amount: number, config: any) => {
    let total = amount;

    // minimum fee
    if (config.minimumFee && total < config.minimumFee) {
        total = config.minimumFee;
    }

    // rounding
    switch (config.rounding) {
        case "nearest_5":
            total = Math.round(total / 5) * 5;
            break;

        case "nearest_10":
            total = Math.round(total / 10) * 10;
            break;

        case "ceil":
            total = Math.ceil(total);
            break;
    }

    return Math.ceil(total);
};