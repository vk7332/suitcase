import { calculateCourtFee } from "./courtfee/court-fee-calculator-engine";
import { courtFeeStates } from "../data/court-fees/index";

export interface TotalCaseCostInput {
    state: string;
    caseType: string; // 'plaint' | 'declaration' | 'appeal' | 'scheduleI'
    suitAmount: number;
    defendants: number;
    applications: number;
    affidavits: number;
    notaryDocs: number;
    vakalatnama: boolean;
    advocateFee: number;
    miscExpenses: number;
}

export class TotalCaseCostEngine {
    static calculate(input: TotalCaseCostInput) {
        const stateData = (courtFeeStates as any)[input.state.toLowerCase()];
        const scheduleII = stateData?.scheduleII || {};
        const additional = stateData?.additional || {};

        let courtFee = 0;
        let breakdown: any = {};

        // 1. Base Court Fee
        if (input.caseType === 'scheduleI') {
            const res = calculateCourtFee({
                state: input.state.toLowerCase(),
                type: 'scheduleI',
                amount: input.suitAmount
            });
            courtFee = res.total || res;
        } else {
            courtFee = scheduleII[input.caseType] || 0;
        }

        // 2. Process Fees
        const processFeePerParty = scheduleII.process || 0;
        const processFee = input.defendants * processFeePerParty;

        // 3. Affidavit Fees
        const affidavitRate = scheduleII.affidavit || 0;
        const affidavitFee = input.affidavits * affidavitRate;

        // 4. Vakalatnama + Welfare
        const vakalatnamaBase = scheduleII.vakalatnama || 0;
        const welfare = additional.advocateWelfare || 0;
        const vakalatnamaFee = input.vakalatnama ? (vakalatnamaBase + welfare) : 0;

        // 5. Application Fees
        const applicationRate = scheduleII.application || 0;
        const applicationFee = input.applications * applicationRate;

        // 6. Notary Fees
        const notaryRate = scheduleII.notary || 0;
        const notaryFee = input.notaryDocs * notaryRate;

        // 7. Total Filing Cost
        const totalFilingCost = courtFee + processFee + affidavitFee + vakalatnamaFee + applicationFee + notaryFee;

        // 8. Total Case Cost (including advocate fee and misc)
        const advocateFee = input.advocateFee || 0;
        const miscExpenses = input.miscExpenses || 0;
        const totalCaseCost = totalFilingCost + advocateFee + miscExpenses;

        return {
            courtFee,
            processFee,
            affidavitFee,
            vakalatnamaFee,
            applicationFee,
            notaryFee,
            totalFilingCost,
            advocateFee,
            miscExpenses,
            totalCaseCost
        };
    }
}


