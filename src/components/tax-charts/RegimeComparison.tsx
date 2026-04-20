import React from 'react';
import { AuditResult } from '@/types/client';

interface RegimeComparisonProps {
    result: AuditResult;
}

const RegimeComparison: React.FC<RegimeComparisonProps> = ({ result }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg glassmorphism">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Regime Comparison</h3>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Old Regime Tax</span>
                    <span className="font-bold text-blue-700 dark:text-blue-400">₹{result.oldTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">New Regime Tax</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">₹{result.newTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Savings</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">₹{result.savings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Recommended Regime</span>
                    <span className="font-bold uppercase text-indigo-700 dark:text-indigo-400">{result.recommendedRegime}</span>
                </div>
            </div>
        </div>
    );
};

export default RegimeComparison;


