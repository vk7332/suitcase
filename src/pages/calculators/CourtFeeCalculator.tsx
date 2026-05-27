import { useState, useEffect } from "react";
import { calculateCourtFee } from "@/engines/courtfee/court-fee-calculator-engine";
import { COURT_FEE_STATES } from "@/utils/constants";
import CourtFeeResult from "@/components/courtfee/CourtFeeResult";
import { generateCourtFeePDF, generateCourtFeePDFBlob } from "@/engines/pdf/court-fee-pdf-engine.ts";
import { uploadCaseDocument } from "@/engines/storage/upload-engine.ts";
import { saveCaseDocument } from "@/engines/case/case-document-engine.ts";
import { supabase } from "@/utils/supabase/supabase-client";

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

export default function CourtFeeCalculatorPage() {
    const [state, setState] = useState("hp");
    const [type, setType] = useState("scheduleI");
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState("plaint");
    const [selectedCaseId, setSelectedCaseId] = useState("");
    const [cases, setCases] = useState<any[]>([]);

    useEffect(() => {
        const fetchCases = async () => {
            const { data } = await supabase.from("cases").select("*");
            setCases(data || []);
        };
        fetchCases();
    }, []);

    const result = calculateCourtFee({
        state,
        type,
        amount,
        category,
    });

    const handleSavePdf = async () => {
        if (!selectedCaseId) return alert("Please select a case first");
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

            {/* CASE SELECTION FOR SAVING */}
            <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full mb-3 p-2 border"
            >
                <option value="">Select a Case to save PDF</option>
                {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.case_title}
                    </option>
                ))}
            </select>

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
            
            <div className="flex gap-2">
                <button
                    onClick={() => window.print()}
                    className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                    Print
                </button>

                <button
                    onClick={handleSavePdf}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
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
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                    Download PDF
                </button>
            </div>

            <div className="mt-4 text-xs text-gray-600">
                <p>• Calculated as per applicable schedule.</p>
                <p>• Subject to verification with local amendments.</p>
                <p>• Generated for informational and professional assistance purposes.</p>
            </div>
        </div>
    );
}

