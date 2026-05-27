import { useState } from "react";
import { calculateCourtFee } from "@/engines/courtfee/court-fee-calculator-engine";
import { COURT_FEE_STATES } from "@/utils/constants";
import CourtFeeResult from "@/components/courtfee/CourtFeeResult";
import { generateCourtFeePDF } from "@/engines/pdf/court-fee-pdf-engine.ts";

const SCHEDULE_TYPES = [
    { label: "Ad Valorem (Schedule I)", value: "scheduleI" },
    { label: "Fixed Fee (Schedule II)", value: "scheduleII" },
];

const FIXED_TYPES = [
    { label: "Plaint / Petition", value: "plaint" },
    { label: "Application", value: "application" },
    { label: "Appeal", value: "appeal" },
    { label: "Affidavit", value: "affidavit" },
    { label: "Vakalatnama", value: "vakalatnama" },
];

export default function CourtFeeCalculator() {
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

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* STATE */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select State</label>
                    <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition bg-gray-50"
                    >
                        {COURT_FEE_STATES.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* TYPE */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fee Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition bg-gray-50"
                    >
                        {SCHEDULE_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* AMOUNT (ONLY FOR SCHEDULE I) */}
                {type === "scheduleI" && (
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Suit Value (₹)</label>
                        <input
                            type="number"
                            placeholder="Enter Suit Amount"
                            value={amount || ""}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                        />
                    </div>
                )}

                {/* CATEGORY (ONLY FOR SCHEDULE II) */}
                {type === "scheduleII" && (
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Document Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition bg-gray-50"
                        >
                            {FIXED_TYPES.map((c) => (
                                <option key={c.value} value={c.value}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* RESULT */}
            {result && (
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-xl">📊</span> Calculation Result
                    </h2>

                    {type === "scheduleI" ? (
                        <CourtFeeResult
                            result={result}
                            state={state}
                            type={type}
                            amount={amount}
                        />
                    ) : (
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-blue-100/50">
                                <span className="text-gray-600">Basic Court Fee</span>
                                <span className="font-semibold text-gray-900">₹ {result.courtFee}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-blue-100/50">
                                <span className="text-gray-600">Additional Charges</span>
                                <span className="font-semibold text-gray-900">₹ {result.additionalCharges}</span>
                            </div>
                            <div className="flex justify-between pt-2 text-xl font-bold text-[#089CCE]">
                                <span>Total Payable</span>
                                <span>₹ {result.total}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 bg-gray-900 text-white p-4 rounded-xl font-bold hover:bg-black transition shadow-lg shadow-black/10"
                >
                    <span>🖨️</span> Print Calculation
                </button>
                <button
                    className="flex items-center justify-center gap-2 bg-white text-[#089CCE] border-2 border-[#089CCE] p-4 rounded-xl font-bold hover:bg-blue-50 transition"
                    onClick={() =>
                        generateCourtFeePDF({
                            state,
                            type,
                            amount,
                            result,
                        })
                    }
                >
                    <span>📄</span> Download PDF
                </button>
            </div>
        </div>
    );
}
