// src/engines/court-fee/court-feeCalculatorEngine.ts

import slabs from "../../data/court-fees/HP/slabs.json";
import fixedFees from "../../data/court-fees/HP/fixedFees.json";

export function calculatecourt-fee(input: any) {

    class court-feeCalculatorEngine {
        static calculate(amount: number): number {
            if (amount <= 0) return 0;
            return Math.round(amount * 0.05);
        }
    }
    const {
        suitValue,
        suitType,
        includeFiling,
        includeApplication,
        includeNotary,
    } = input;

    let court-fee = 0;

    // 🧠 SLAB CALCULATION
    // ...existing code...
    if (suitType === "money") {
        for (const slab of slabs) {
            if (suitValue <= slab.limit) {
                court-fee =
                    (suitValue - slab.previousLimit) * slab.rate;
                break;
            }
        }
    }
    // ...existing code...

    // 🧾 FIXED SUITS
    if (suitType === "declaration") {
        court-fee = 98;
    }

    if (suitType === "general") {
        court-fee = 48;
    }

    // 📦 OTHER FEES
    const filingFee = includeFiling ? 20 : 0;
    const applicationFee = includeApplication ? 20 : 0;
    const affidavitFee = 20;
    const processFee = 1.5;
    const vakalatnama = 45;
    const notaryFee = includeNotary ? 55 : 0;

    const total =
        court-fee +
        filingFee +
        applicationFee +
        affidavitFee +
        processFee +
        vakalatnama +
        notaryFee;

    return {
        court-fee,
        filingFee,
        applicationFee,
        affidavitFee,
        processFee,
        vakalatnama,
        notaryFee,
        total,
    };
}

const [options, setOptions] = useState({
    includeFiling: true,
    includeApplication: true,
    includeNotary: false,
});
