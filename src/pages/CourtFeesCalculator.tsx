import { useState } from "react";
import { court-feeCalculatorEngine } from "../engines/court-fee/court-feeCalculatorEngine";

const court-feesCalculator = () => {
    const [form, setForm] = useState({
        state: "HP",
        caseType: "moneySuit",
        amount: 0,
        defendants: 1,
        applications: 1,
        affidavits: 1,
        notaryDocs: 1,
        vakalatnama: true,
        includeNotaryFee: true,
        includeApplicationFee: true,
        includeFilingFee: true,
    });

    const [result, setResult] = useState<any>(null);

    const calculateFees = () => {
        const res = court-feeCalculatorEngine.calculate(form);
        setResult(res);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">

            {/* HEADER */}
            <h1 className="text-3xl font-bold mb-2">
                Court Fee Calculator
            </h1>
            <p className="text-sm text-gray-600 mb-4">
                VK Tax & Law Chamber® | Advocate: VIPIN KUMAR TAMRA
            </p>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">

                {/* Case Type */}
                <select
                    className="border p-2"
                    value={form.caseType}
                    onChange={(e) =>
                        setForm({ ...form, caseType: e.target.value })
                    }
                >
                    <option value="moneySuit">Money Suit</option>
                    <option value="declaratorySuit">Declaratory Suit</option>
                    <option value="injunctionSuit">Injunction Suit</option>
                    <option value="application">Application</option>
                    <option value="revenue">Revenue Filing</option>
                </select>

                {/* Amount */}
                <input
                    className="border p-2"
                    type="number"
                    placeholder="Suit Amount"
                    onChange={(e) =>
                        setForm({ ...form, amount: Number(e.target.value) })
                    }
                />

                {/* Defendants */}
                <input
                    className="border p-2"
                    type="number"
                    placeholder="Defendants"
                    onChange={(e) =>
                        setForm({ ...form, defendants: Number(e.target.value) })
                    }
                />

                {/* Applications */}
                <input
                    disabled={!form.includeApplicationFee}
                    className="border p-2"
                    type="number"
                    placeholder="Applications"
                    onChange={(e) =>
                        setForm({ ...form, applications: Number(e.target.value) })
                    }
                />

                {/* Affidavits */}
                <input
                    className="border p-2"
                    type="number"
                    placeholder="Affidavits"
                    onChange={(e) =>
                        setForm({ ...form, affidavits: Number(e.target.value) })
                    }
                />

                {/* Notary */}
                <input
                    disabled={!form.includeNotaryFee}
                    className="border p-2"
                    type="number"
                    placeholder="Notary Docs"
                    onChange={(e) =>
                        setForm({ ...form, notaryDocs: Number(e.target.value) })
                    }
                />

                {/* TOGGLES */}
                <label>
                    <input
                        type="checkbox"
                        checked={form.includeFilingFee}
                        onChange={(e) =>
                            setForm({ ...form, includeFilingFee: e.target.checked })
                        }
                    />
                    Include Filing Fee
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={form.includeApplicationFee}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                includeApplicationFee: e.target.checked,
                            })
                        }
                    />
                    Include Application Fee
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={form.includeNotaryFee}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                includeNotaryFee: e.target.checked,
                            })
                        }
                    />
                    Include Notary Fee
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={form.vakalatnama}
                        onChange={(e) =>
                            setForm({ ...form, vakalatnama: e.target.checked })
                        }
                    />
                    Vakalatnama
                </label>
            </div>

            {/* BUTTON */}
            <button
                onClick={calculateFees}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Calculate Fees
            </button>

            {/* RESULT */}
            {result && (
                <div className="mt-6 border p-4 rounded bg-gray-50">
                    <h2 className="text-xl font-semibold mb-2">
                        Fee Breakdown
                    </h2>

                    <div className="flex justify-between">
                        <span>Court Fee</span>
                        <span>₹ {result.court-fee.toFixed(2)}</span>
                    </div>

                    {form.includeFilingFee && (
                        <div className="flex justify-between">
                            <span>Filing Fee</span>
                            <span>₹ {result.filingFee.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <span>Process Fee</span>
                        <span>₹ {result.processFee.toFixed(2)}</span>
                    </div>

                    {form.includeApplicationFee && (
                        <div className="flex justify-between">
                            <span>Application Fee</span>
                            <span>₹ {result.applicationFee.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <span>Affidavit Fee</span>
                        <span>₹ {result.affidavitFee.toFixed(2)}</span>
                    </div>

                    {form.includeNotaryFee && (
                        <div className="flex justify-between">
                            <span>Notary Fee</span>
                            <span>₹ {result.notaryFee.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <span>Vakalatnama Fee</span>
                        <span>₹ {result.vakalatnamaFee.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg mt-2">
                        <span>Total</span>
                        <span>₹ {result.total.toFixed(2)}</span>
                    </div>

                    {/* NOTE */}
                    <p className="text-sm mt-3 text-gray-600">
                        Note: Minimum application court fee in Himachal Pradesh is ₹20 per application in Civil and Revenue Courts.
                    </p>
                </div>
            )}

            {/* PROFESSIONAL PROFILE */}
            <div className="mt-8 p-4 border rounded bg-white">
                <h3 className="font-semibold text-lg mb-2">
                    About Advocate
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed">
                    I have adequate qualifications (M.Com & LLB.) and have more than ten years’ experience in accounts, filing ITR and also practicing as an advocate for the last ten years. Commerce is my main subject after matric to M.Com. I was also Assistant Professor (Commerce) w.e.f June 2015 to April 2017 at Government Degree College as Guest Faculty. I have a one-year computer diploma including MS Office, Tally ERP9 with typing speed 30 WPM. I have good knowledge of English, Hindi and Punjabi. I am expert in drafting, editing, designing, analysis and typing of papers online & offline. I understand practical problems in accounts, commerce, economics, finance, management and law.
                </p>

                <div className="mt-3 text-sm">
                    <p><b>Advocate:</b> VIPIN KUMAR TAMRA</p>
                    <p><b>WhatsApp / Call:</b> 7018064385</p>
                    <p><b>Email:</b> vk7332@gmail.com</p>
                    <p><b>Support:</b> vkcalc.in@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default court-feesCalculator;
