import { useState, useEffect } from "react";
import { TotalCaseCostEngine } from "../../engines/total-case-cost-engine";
import { saveCalculation } from "../../services/calculation-history-service";
import { COURT_FEE_STATES } from "../../utils/constants";

const CASE_TYPES = [
    { label: "Plaint / Injunction Suit", value: "plaint" },
    { label: "Declaration Suit", value: "declaration" },
    { label: "Appeal", value: "appeal" },
    { label: "Application (i.e. u/O 39 R 1&2)", value: "application" },
    { label: "Ad Valorem (Schedule I)", value: "scheduleI" },
];

export default function TotalCaseCostCalculator() {
    const [result, setResult] = useState<any>(null);

    const [form, setForm] = useState({
        state: "hp",
        caseType: "plaint",
        suitAmount: 0,
        defendants: 1,
        applications: 0,
        affidavits: 1, // At least one for the suit
        notaryDocs: 0,
        vakalatnama: true,
        advocateFee: 0,
        miscExpenses: 0,
    });

    const calculate = async () => {
        const res = TotalCaseCostEngine.calculate(form as any);
        setResult(res);

        try {
            await saveCalculation({
                state: form.state,
                suit_amount: form.suitAmount,
                defendants: form.defendants,
                court_fee: res.courtFee,
                process_fee: res.processFee,
                affidavit_fee: res.affidavitFee,
                vakalatnama_fee: res.vakalatnamaFee,
                application_fee: res.applicationFee,
                notary_fee: res.notaryFee,
                advocate_fee: res.advocateFee,
                misc_expenses: res.miscExpenses,
                total_cost: res.totalCaseCost,
            });
        } catch (e) {
            console.error("Failed to save calculation", e);
        }
    };

    useEffect(() => {
        calculate();
    }, [form]);

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <span className="text-3xl">⚖️</span> Total Case Filing Cost
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* FORM SECTION */}
                <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                        <h3 className="font-bold text-gray-700 mb-2 uppercase text-xs tracking-wider">Case Details</h3>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                            <select
                                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                value={form.state}
                                onChange={(e) => setForm({ ...form, state: e.target.value })}
                            >
                                {COURT_FEE_STATES.map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Case Type</label>
                            <select
                                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                value={form.caseType}
                                onChange={(e) => setForm({ ...form, caseType: e.target.value })}
                            >
                                {CASE_TYPES.map((t) => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>

                        {form.caseType === 'scheduleI' && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Suit Amount (₹)</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                    value={form.suitAmount}
                                    onChange={(e) => setForm({ ...form, suitAmount: Number(e.target.value) })}
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Defendants</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                    value={form.defendants}
                                    onChange={(e) => setForm({ ...form, defendants: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Applications</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                    value={form.applications}
                                    onChange={(e) => setForm({ ...form, applications: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Affidavits</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                    value={form.affidavits}
                                    onChange={(e) => setForm({ ...form, affidavits: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Notary Docs</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                    value={form.notaryDocs}
                                    onChange={(e) => setForm({ ...form, notaryDocs: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-2">
                            <input
                                type="checkbox"
                                id="vakalatnama"
                                className="w-5 h-5 accent-[#089CCE]"
                                checked={form.vakalatnama}
                                onChange={(e) => setForm({ ...form, vakalatnama: e.target.checked })}
                            />
                            <label htmlFor="vakalatnama" className="text-sm font-bold text-gray-700">Include Vakalatnama + Welfare</label>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl space-y-4">
                        <h3 className="font-bold text-blue-700 mb-2 uppercase text-xs tracking-wider">Professional Fees</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Advocate Fee</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                    value={form.advocateFee}
                                    onChange={(e) => setForm({ ...form, advocateFee: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Misc Expenses</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none transition"
                                    value={form.miscExpenses}
                                    onChange={(e) => setForm({ ...form, miscExpenses: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RESULT SECTION */}
                <div className="space-y-6">
                    {result && (
                        <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sticky top-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
                                Fee Breakdown
                                <span className="text-xs font-normal text-gray-400">Values in ₹</span>
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">
                                        {form.caseType === 'application' ? 'Application Fee' : 'Court Fee'}
                                    </span>
                                    <span className="font-bold text-gray-900">{result.courtFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Process Fee</span>
                                    <span className="font-bold text-gray-900">{result.processFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Affidavit Fee</span>
                                    <span className="font-bold text-gray-900">{result.affidavitFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Vakalatnama + Welfare</span>
                                    <span className="font-bold text-gray-900">{result.vakalatnamaFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Application Fee</span>
                                    <span className="font-bold text-gray-900">{result.applicationFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Notary Fee</span>
                                    <span className="font-bold text-gray-900">{result.notaryFee.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between py-4 mt-4 border-t-2 border-dashed border-gray-100">
                                    <span className="text-gray-900 font-bold uppercase tracking-wider">Total Filing Cost</span>
                                    <span className="text-xl font-black text-[#089CCE]">{result.totalFilingCost.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between py-2 text-sm text-gray-400">
                                    <span>Advocate Fee</span>
                                    <span>{result.advocateFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-sm text-gray-400">
                                    <span>Misc Expenses</span>
                                    <span>{result.miscExpenses.toFixed(2)}</span>
                                </div>

                                <div className="bg-[#089CCE] text-white p-6 rounded-2xl mt-8 shadow-lg shadow-[#089CCE]/20">
                                    <div className="text-xs uppercase font-bold opacity-80 mb-1">Total Case Filing Cost</div>
                                    <div className="text-4xl font-black">₹ {result.totalCaseCost.toFixed(2)}</div>
                                </div>
                            </div>

                            <button
                                onClick={() => window.print()}
                                className="w-full mt-8 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2"
                            >
                                <span>📄</span> Print Calculation Sheet
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-xs text-gray-500 leading-relaxed border border-gray-100">
                <p className="font-bold text-gray-700 mb-2 underline">Important Notes:</p>
                <ol className="list-decimal ml-4 space-y-2">
                    <li>There is a minimum fee on every application, which is <strong>Rs. 20/-</strong> for the Court and Revenue Applications in Himachal Pradesh.</li>
                    <li>Every suit/appeal/application should be accompanied with an <strong>affidavit</strong>.</li>
                    <li>Process fees and welfare charges are calculated as per applicable state schedules and Bar Association rules.</li>
                    <li>This tool is for professional assistance only. Please verify with the current statute before filing.</li>
                </ol>
            </div>
        </div>
    );
}


