import { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { Save, ShieldCheck, TrendingUp } from 'lucide-react';

export const SettingsPage = () => {
    const { settings, updateSettings } = useSettings();
    const [formData, setFormData] = useState(settings);

    const handleSave = () => {
        updateSettings(formData);
        alert("Tax Configuration Updated Successfully!");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <ShieldCheck className="text-blue-600" /> Compliance Settings
                </h2>

                <div className="grid gap-6">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Assessment Year</label>
                        <input
                            type="text"
                            value={formData.assessmentYear}
                            onChange={e => setFormData({ ...formData, assessmentYear: e.target.value })}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Standard Deduction (₹)</label>
                            <input
                                type="number"
                                value={formData.standardDeduction}
                                onChange={e => setFormData({ ...formData, standardDeduction: Number(e.target.value) })}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Health & Cess (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.cessRate * 100}
                                onChange={e => setFormData({ ...formData, cessRate: Number(e.target.value) / 100 })}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <input
                        type="checkbox"
                        id="comparisonMode"
                        checked={formData.isComparisonMode}
                        onChange={e => setFormData({ ...formData, isComparisonMode: e.target.checked })}
                        className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="comparisonMode" className="text-sm font-medium text-slate-700">
                        Enable Scenario Analysis
                    </label>
                </div>

                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-blue-800 flex items-center gap-2">
                            <TrendingUp size={18} /> Budget Scenario Analysis
                        </h3>
                        <input
                            type="checkbox"
                            checked={formData.isComparisonMode}
                            onChange={e => setFormData({ ...formData, isComparisonMode: e.target.checked })}
                            className="w-5 h-5 accent-blue-600"
                        />
                    </div>

                    {formData.isComparisonMode && (
                        <div className="animate-in fade-in zoom-in duration-300">
                            <label className="block text-[10px] font-bold text-blue-400 uppercase mb-2">Proposed Standard Deduction (₹)</label>
                            <input
                                type="number"
                                value={formData.provisionalDeduction}
                                onChange={e => setFormData({ ...formData, provisionalDeduction: Number(e.target.value) })}
                                className="w-full p-3 bg-white border border-blue-200 rounded-xl font-bold text-blue-900"
                                placeholder="e.g. 100000"
                            />
                            <p className="text-[10px] text-blue-500 mt-2 italic">
                                *Calculators will now use this value instead of the current ₹{formData.standardDeduction}.
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSave}
                    className="mt-8 w-full bg-blue-600 text-white p-4 rounded-2xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all"
                >
                    <Save size={18} /> Update Global Configuration
                </button>
            </div>
        </div>
    );
};
