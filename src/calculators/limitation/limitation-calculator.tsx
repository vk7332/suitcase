import React, { useState, useEffect } from "react";
import { LimitationCalculatorEngine } from "../../engines/limitation-calculator-engine";
import { LIMITATION_DATA, LimitationEntry } from "../../data/limitation-periods";

export default function LimitationCalculator() {
    const [category, setCategory] = useState<string>("civil");
    const [selectedEntryId, setSelectedEntryId] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [result, setResult] = useState<any>(null);

    const categories = [
        { label: "Civil Suits", value: "civil" },
        { label: "Appeals & Revisions", value: "appeals" },
        { label: "Criminal Cognizance", value: "criminal" },
        { label: "Execution Proceedings", value: "execution" },
        { label: "Other / Special Acts", value: "other" },
    ];

    const filteredEntries = LimitationCalculatorEngine.getEntriesByCategory(category);

    useEffect(() => {
        if (filteredEntries.length > 0) {
            setSelectedEntryId(filteredEntries[0].id);
        }
    }, [category]);

    useEffect(() => {
        const entry = LIMITATION_DATA.find(e => e.id === selectedEntryId);
        if (entry && startDate) {
            const res = LimitationCalculatorEngine.calculate(startDate, entry);
            setResult(res);
        } else {
            setResult(null);
        }
    }, [selectedEntryId, startDate]);

    const selectedEntry = LIMITATION_DATA.find(e => e.id === selectedEntryId);

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Limitation Period Calculator</h2>
                    <p className="text-sm text-gray-500 font-medium italic">समय सीमा कैलकुलेटर</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* INPUT SECTION */}
                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                        <h3 className="font-bold text-gray-700 mb-2 uppercase text-xs tracking-wider">Select Matter Details</h3>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Category (श्रेणी)</label>
                            <select
                                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nature of Suit/Matter (मामले की प्रकृति)</label>
                            <select
                                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                                value={selectedEntryId}
                                onChange={(e) => setSelectedEntryId(e.target.value)}
                            >
                                {filteredEntries.map((entry) => (
                                    <option key={entry.id} value={entry.id}>{entry.nature}</option>
                                ))}
                            </select>
                        </div>

                        {selectedEntry && (
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-800 font-bold uppercase mb-1">Limitation Rule:</p>
                                <p className="text-sm font-semibold text-blue-900">{selectedEntry.period}</p>
                                <p className="text-xs text-blue-600 mt-1">Starting from: {selectedEntry.startingPoint}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Starting Date (प्रारंभ तिथि)</label>
                            <input
                                type="date"
                                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <p className="text-[10px] text-gray-400 mt-1 italic">Date of cause of action, order, or knowledge.</p>
                        </div>
                    </div>
                </div>

                {/* RESULT SECTION */}
                <div className="space-y-6">
                    {result ? (
                        <div className={`border-2 rounded-3xl p-8 sticky top-4 transition-all duration-300 ${
                            result.isExpired ? 'bg-red-50 border-red-100' : 
                            result.isNearExpiry ? 'bg-orange-50 border-orange-100' : 
                            'bg-green-50 border-green-100'
                        }`}>
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
                                Calculation Result
                                <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                                    result.isExpired ? 'bg-red-200 text-red-800' : 
                                    result.isNearExpiry ? 'bg-orange-200 text-orange-800' : 
                                    'bg-green-200 text-green-800'
                                }`}>
                                    {result.isExpired ? 'Expired' : result.isNearExpiry ? 'Expiring Soon' : 'Active'}
                                </span>
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs uppercase font-bold text-gray-400 mb-1">Deadline Date (अंतिम तिथि)</p>
                                    <p className={`text-3xl font-black ${result.isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                                        {result.deadlineStr}
                                    </p>
                                </div>

                                <div className="p-6 bg-white rounded-2xl shadow-sm border border-white/50">
                                    <div className="text-xs uppercase font-bold text-gray-400 mb-1">Time Remaining</div>
                                    <div className={`text-4xl font-black ${
                                        result.isExpired ? 'text-red-600' : 
                                        result.isNearExpiry ? 'text-orange-500' : 
                                        'text-blue-600'
                                    }`}>
                                        {result.isExpired ? 
                                            `${Math.abs(result.daysLeft)} Days Overdue` : 
                                            `${result.daysLeft} Days Left`
                                        }
                                    </div>
                                </div>

                                <button
                                    onClick={() => window.print()}
                                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                                >
                                    <span>📄</span> Print Summary
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[300px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-gray-400">
                            <span className="text-5xl mb-4 opacity-30">⌛</span>
                            <p className="font-medium">Enter a starting date to calculate the limitation deadline.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* LEGAL NOTES */}
            <div className="mt-12 p-8 bg-blue-900 rounded-3xl text-white">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">⚖️</span>
                    <h3 className="text-lg font-bold">Important Legal Provisions (महत्वपूर्ण कानूनी प्रावधान)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm opacity-90 leading-relaxed">
                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-blue-200 mb-1 underline">Section 5 - Condonation of Delay</p>
                            <p>Court may condone delay if "sufficient cause" is shown. Generally applicable to Appeals and Applications, not to original suits.</p>
                        </div>
                        <div>
                            <p className="font-bold text-blue-200 mb-1 underline">Section 18 - Acknowledgment</p>
                            <p>Fresh limitation starts if an acknowledgment is made in writing before the original period expires.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-blue-200 mb-1 underline">Section 17 - Fraud or Concealment</p>
                            <p>Limitation starts from the discovery of fraud or mistake. Crucial for forged wills or property fraud.</p>
                        </div>
                        <div>
                            <p className="font-bold text-blue-200 mb-1 underline">Section 19 - Part Payment</p>
                            <p>Part payment made before expiry gives a fresh period of limitation from the date of payment.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-[10px] text-blue-200/60 uppercase tracking-widest text-center font-bold">
                    Developed with Professional Diligence for VK Tax & Law Chamber®
                </div>
            </div>
        </div>
    );
}


