import React, { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { calculateSimpleInterest, calculateComparativeCI } from '@/engines/InterestEngine';

const InterestPortal: React.FC = () => {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(8);
    const [tenure, setTenure] = useState(5);

    const siData = useMemo(() => calculateSimpleInterest(amount, rate, tenure), [amount, rate, tenure]);
    const comparisonData = useMemo(() => calculateComparativeCI(amount, rate, tenure), [amount, rate, tenure]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Input Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <TrendingUp className="text-blue-600" /> Interest Growth Planner
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Principal (₹)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Rate (% p.a.)</label>
                        <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tenure (Years)</label>
                        <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
                    </div>
                </div>
            </div>

            {/* [UI_ANCHOR] - Simple Interest Result */}
            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Simple Interest Result</p>
                <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-bold">₹{siData.total.toLocaleString('en-IN')}</h3>
                    <p className="text-blue-400 text-sm font-medium">Interest: ₹{siData.interest.toLocaleString('en-IN')}</p>
                </div>
            </div>

            {/* Comparison Table UI Block */}
            <div className="mt-8 space-y-6">
                <h3 className="text-lg font-bold text-slate-800 px-1">Compounding Comparison</h3>
                <div className="overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase">Frequency</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase text-right">Interest Earned</th>
                                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase text-right">Final Maturity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {comparisonData.map((row, idx) => (
                                <tr key={row.frequency} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-4 font-bold text-slate-700">{row.frequency}</td>
                                    <td className="p-4 text-right">
                                        <p className="font-bold text-green-600">₹{row.interestEarned.toLocaleString('en-IN')}</p>
                                        {idx > 0 && (
                                            <p className="text-[10px] text-blue-500 font-medium">
                                                +{(row.interestEarned - comparisonData[0].interestEarned).toLocaleString('en-IN')} vs Yearly
                                            </p>
                                        )}
                                    </td>
                                    <td className="p-4 text-right font-bold text-slate-800">₹{row.finalAmount.toLocaleString('en-IN')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InterestPortal;
