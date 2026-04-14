import { calculateSlabEngine } from "../../engines/court-fee/court-feeSlabEngine";
import { getStateFeeRules } from "../../services/court-feeService";
import {
    court-feeInput,
    court-feeResult,
    FeeRules,
} from "../../types/court-feeTypes";
import { useState, ReactNode } from "react";
import FeeBreakdown from "./FeeBreakdown";
import CaseDetailsForm from "./CaseDetailsForm";

interface CaseDetailsFormProps {
    onCalculate: (formData: any) => void;
}

export default function court-feeCalculator() {
    const [result, setResult] = useState<any>(null);

    const handleCalculate = (formData: any) => {
        const res = court-feeCalculatorEngine.calculate(formData);
        setResult(res);
    };

    return (
        <div className="p-4">
            <CaseDetailsForm onCalculate={handleCalculate} />
            {result && <FeeBreakdown data={result} />}
        </div>
    );
}

export class court-feeCalculatorEngine {
    static calculate(input: court-feeInput): court-feeResult {
        const { slabs, fixedFees }: FeeRules = getStateFeeRules(input.state);

        let court-fee = 0;

        // ==============================
        // 1. COURT FEE CALCULATION
        // ==============================

        switch (input.caseType) {
            case "moneySuit":
            case "propertySuit":
                court-fee = calculateSlabEngine(
                    input.amount,
                    slabs.moneySuit
                );
                break;

            case "declaratorySuit":
                court-fee = fixedFees.declaratorySuit;
                break;

            case "injunctionSuit":
                court-fee = fixedFees.injunctionSuit;
                break;

            case "appeal":
                court-fee = fixedFees.appeal || 0;
                break;

            case "execution":
                court-fee = fixedFees.execution || 0;
                break;

            default:
                court-fee = 0;
        }

        // ==============================
        // 2. ADDITIONAL FEES
        // ==============================

        const filingFee = fixedFees.filingFee || 0;

        const processFee =
            (input.defendants || 0) * (fixedFees.processFee || 0);

        const applicationFee =
            (input.applications || 0) * (fixedFees.applicationFee || 0);

        const affidavitFee =
            (input.affidavits || 0) * (fixedFees.affidavitFee || 0);

        const notaryFee =
            (input.notaryDocs || 0) * (fixedFees.notaryFee || 0);

        const vakalatnamaFee = input.vakalatnama
            ? (fixedFees.vakalatnama || 0) +
            (fixedFees.advocateWelfare || 0)
            : 0;

        // ==============================
        // 3. TOTAL CALCULATION
        // ==============================

        const total =
            court-fee +
            filingFee +
            processFee +
            applicationFee +
            affidavitFee +
            notaryFee +
            vakalatnamaFee;

        return {
            court-fee,
            filingFee,
            processFee,
            applicationFee,
            affidavitFee,
            notaryFee,
            vakalatnamaFee,
            total,
        };
    }
}
