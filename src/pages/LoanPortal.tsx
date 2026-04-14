import React, { useState, useMemo } from 'react';
import { Landmark, Calendar, Percent, IndianRupee } from 'lucide-react';
import { calculateEMI } from '@/engines/LoanEngine';

export const LoanPortal: React.FC = () => {
    const [amount, setAmount] = useState(1000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(15);

    const emiData = useMemo(() => calculateEMI(amount, rate, tenure), [amount, rate, tenure]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Input Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Landmark className="text-blue-600" /> Loan & EMI Planner
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Amount Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Principal Amount</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                            />
                        </div>
                    </div>

                    {/* Rate Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Interest Rate (%)</label>
                        <div className="relative">
                            <Percent className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="number"
                                step="0.1"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                            />
                        </div>
                    </div>

                    {/* Tenure Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Tenure (Years)</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="number"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Result Card */}
            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-blue-100 text-sm font-medium mb-1">Monthly EMI</p>
                        <h3 className="text-4xl font-bold">₹{emiData.monthlyEmi.toLocaleString('en-IN')}</h3>
                        <div className="mt-4 flex gap-4">
                            <div>
                                <p className="text-blue-200 text-xs uppercase font-bold tracking-wider">Total Interest</p>
                                <p className="font-bold">₹{emiData.totalInterest.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="border-l border-white/20 pl-4">
                                <p className="text-blue-200 text-xs uppercase font-bold tracking-wider">Total Payable</p>
                                <p className="font-bold">₹{emiData.totalPayment.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Graph Placeholder */}
                    <div className="hidden md:block h-24 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center italic text-blue-100 text-xs">
                        Interest-to-Principal Visualization
                    </div>
                </div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};
