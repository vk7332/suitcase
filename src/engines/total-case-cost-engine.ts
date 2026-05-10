import { calculateCourtFee } from "./courtFee/courtFeeCalculatorEngine";

export interface TotalCaseCostInput {
    state: string;
    suitAmount: number;
    defendants: number;
    includeFilingFee: boolean;
    includeApplication: boolean;
    includeAffidavit: boolean;
    includeNotary: boolean;

    vakalatnamaValue: number;

    advocateFee: number;
    miscExpenses: number;
}

export class TotalCaseCostEngine {
    static calculate(input: TotalCaseCostInput) {
        // 1. Court Fee Calculation
        const courtFeeData = calculateCourtFee({
            state: input.state as any,
            suitAmount: input.suitAmount,
            defendants: input.defendants,
            includeFilingFee: input.includeFilingFee,
            includeApplication: input.includeApplication,
            includeAffidavit: input.includeAffidavit,
            includeNotary: input.includeNotary,
            vakalatnamaValue: input.vakalatnamaValue,
        });

        // 2. Advocate Fee
        const advocateFee = input.advocateFee || 0;

        // 3. Misc Expenses
        const miscExpenses = input.miscExpenses || 0;

        // 4. Total Case Cost
        const totalCaseCost =
            courtFeeData.total +
            advocateFee +
            miscExpenses;

        return {
            courtFeeBreakdown: courtFeeData,
            advocateFee,
            miscExpenses,
            totalCaseCost,
        };
    }
}


