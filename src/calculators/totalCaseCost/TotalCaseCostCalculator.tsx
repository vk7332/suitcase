import { useState } from "react";
import { exportFeeReport } from "../../utils/pdfExport";
import { TotalCaseCostEngine } from "../../engines/TotalCaseCostEngine";
import { saveCalculation } from "../../services/CalculationHistoryService";

export default function TotalCaseCostCalculator() {
    const [result, setResult] = useState<any>(null);

    const [form, setForm] = useState({
        state: "HP",
        suitAmount: 0,
        defendants: 1,
        includeFilingFee: true,
        includeApplication: true,
        includeAffidavit: true,
        includeNotary: false,
        vakalatnamaValue: 20,
        advocateFee: 0,
        miscExpenses: 0,
    });

    const calculate = async () => {
        const res = TotalCaseCostEngine.calculate(form);
        setResult(res);

        await saveCalculation({
            state: form.state,
            suit_amount: form.suitAmount,
            defendants: form.defendants,

            court_fee: res.court-feeBreakdown.court-fee,
            filing_fee: res.court-feeBreakdown.filingFee,
            application_fee: res.court-feeBreakdown.applicationFee,
            affidavit_fee: res.court-feeBreakdown.affidavitFee,
            process_fee: res.court-feeBreakdown.processFee,
            vakalatnama_fee: res.court-feeBreakdown.vakalatnama,
            notary_fee: res.court-feeBreakdown.notaryFee,

            advocate_fee: res.advocateFee,
            misc_expenses: res.miscExpenses,

            total_cost: res.totalCaseCost,
        });
    };

    useEffect(() => {
        const saved = localStorage.getItem("loadCalculation");
        if (saved) {
            const data = JSON.parse(saved);

            setForm({
                state: data.state,
                suitAmount: data.suit_amount,
                defendants: data.defendants,
                includeFilingFee: true,
                includeApplication: true,
                includeAffidavit: true,
                includeNotary: false,
                vakalatnamaValue: 20,
                advocateFee: data.advocate_fee,
                miscExpenses: data.misc_expenses,
            });

            localStorage.removeItem("loadCalculation");
        }
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                Total Case Cost Calculator
            </h2>

            <input
                type="number"
                placeholder="Suit Amount"
                className="border p-2 mr-2"
                onChange={(e) =>
                    setForm({ ...form, suitAmount: Number(e.target.value) })
                }
            />

            <input
                type="number"
                placeholder="Advocate Fee"
                className="border p-2 mr-2"
                onChange={(e) =>
                    setForm({ ...form, advocateFee: Number(e.target.value) })
                }
            />

            <input
                type="number"
                placeholder="Misc Expenses"
                className="border p-2 mr-2"
                onChange={(e) =>
                    setForm({ ...form, miscExpenses: Number(e.target.value) })
                }
            />

            <button
                onClick={calculate}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Calculate
            </button>

            {result && (
                <div className="mt-4 border p-4">
                    <p>Court Fee Total: ₹ {result.court-feeBreakdown.total}</p>
                    <p>Advocate Fee: ₹ {result.advocateFee}</p>
                    <p>Misc Expenses: ₹ {result.miscExpenses}</p>

                    <h3 className="font-bold mt-2">
                        Total Case Cost: ₹ {result.totalCaseCost}
                    </h3>

                    <button
                        onClick={() => exportFeeReport(result)}
                        className="mt-4 bg-green-600 text-white px-4 py-2"
                    >
                        Download PDF Report
                    </button>
                </div>

            )}
        </div>

    );
}
