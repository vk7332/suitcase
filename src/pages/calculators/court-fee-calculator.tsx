import CourtFeeCalculator from "@/calculators/courtfee/courtfeecalculator";

export default function CourtFeesPage() {
    return <CourtFeeCalculator />;
}

import { useState } from "react";
import { calculateCourtFee } from "@/engines/courtFee/courtFeeCalculatorEngine";
import { COURT_FEE_STATES } from "@/utils/constants";
import CourtFeeResult from "@/components/courtFee/courtFeeResult";
import { generateCourtFeePDF } from "@/engines/pdf/courtFeePdf.engine";
import { generateCourtFeePDFBlob } from "@/engines/pdf/courtFeePdf.engine";
import { uploadCaseDocument } from "@/engines/storage/upload.engine";
import { saveCaseDocument } from "@/engines/case/caseDocument.engine";

const SCHEDULE_TYPES = [
    { label: "Ad Valorem (Schedule I)", value: "scheduleI" },
    { label: "Fixed Fee (Schedule II)", value: "scheduleII" },
];

const FIXED_TYPES = [
    "plaint",
    "application",
    "appeal",
    "affidavit",
    "vakalatnama",
];

export default async function CourtFeeCalculatorPage() {
    const [state, setState] = useState("hp");
    const [type, setType] = useState("scheduleI");
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState("plaint");

    const result = calculateCourtFee({
        state,
        type,
        amount,
        category,
    });

    if (type === "scheduleI" && amount <= 0) {
        return "Enter valid amount";
    }

    const { data } = await supabase
        .from("case_documents")
        .select("*")
        .eq("case_id", caseId);

    const handleSavePdf = async () => {
        try {
            const blob = generateCourtFeePDFBlob({
                state,
                type,
                amount,
                result,
            });

            const upload = await uploadCaseDocument({
                file: blob,
                caseId: selectedCaseId,
            });

            await saveCaseDocument({
                caseId: selectedCaseId,
                fileName: upload.fileName,
                fileUrl: upload.url,
            });

            alert("PDF saved to case successfully");
        } catch (err) {
            console.error(err);
            alert("failed to save document");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Court Fee Calculator</h1>

            {/* STATE */}
            <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full mb-3 p-2 border"
            >
                {COURT_FEE_STATES.map((s) => (
                    <option key={s.value} value={s.value}>
                        {s.label}
                    </option>
                ))}
            </select>

            {/* TYPE */}
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full mb-3 p-2 border"
            >
                {SCHEDULE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                        {t.label}
                    </option>
                ))}
            </select>

            {/* AMOUNT (ONLY FOR SCHEDULE I) */}
            {type === "scheduleI" && (
                <input
                    type="number"
                    placeholder="Enter Suit Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full mb-3 p-2 border"
                />
            )}

            {/* CATEGORY (ONLY FOR SCHEDULE II) */}
            {type === "scheduleII" && (
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mb-3 p-2 border"
                >
                    {FIXED_TYPES.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            )}

            {/* RESULT */}
            <div className="mt-4 p-4 border rounded">
                <h2 className="font-semibold mb-2">Result</h2>

                {type === "scheduleI" && (
                    <CourtFeeResult
                        result={result}
                        state={state}
                        type={type}
                        amount={amount}
                    />
                )}

                {type === "scheduleII" && result && typeof result === "object" && (
                    <>
                        <p>Court Fee: ₹ {result.courtFee}</p>
                        <p>Additional Charges: ₹ {result.additionalCharges}</p>
                        <p className="font-bold">Total: ₹ {result.total}</p>
                    </>
                )}
            </div>
            <button
                onClick={() => window.print()}
                className="mt-4 px-4 py-2 bg-black text-white"
            >
                Print / Save PDF
            </button>
            <div className="mt-4 text-xs text-gray-600">
                <p>• Calculated as per applicable schedule.</p>
                <p>• Subject to verification with local amendments.</p>
                <p>• Generated for informational and professional assistance purposes.</p>
            </div>

            <button
                onClick={handleSavePdf}
                className="mt-4 px-4 py-2 bg-blue-600 text-white"
            >
                Save to Case File
            </button>

            <button
                onClick={() =>
                    generateCourtFeePDF({
                        state,
                        type,
                        amount,
                        result,
                    })
                }
                className="mt-4 px-4 py-2 bg-green-600 text-white"
            >
                Download PDF
            </button>

        </div>
    );
}
