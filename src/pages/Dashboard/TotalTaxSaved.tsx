import React from 'react';
import { useHistory } from '@/context/HistoryContext';

const TotalTaxSaved: React.FC = () => {
    const { clients } = useHistory();
    const totalSaved = clients.reduce((sum, c) => sum + (c.auditReport?.savings || 0), 0);

    return (
        <div className="w-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-4 flex items-center justify-between shadow-sm">
            <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">Total Tax Saved</span>
            <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">₹{totalSaved.toLocaleString('en-IN')}</span>
        </div>
    );
};

export default TotalTaxSaved;


