import { useState } from "react";
import { generateDraft } from "../../services/AIDraftService";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AIDraftPage() {
    const [prompt, setPrompt] = useState("");
    const [draft, setDraft] = useState("");

    const handleGenerate = async () => {
        const result = await generateDraft(prompt);
        setDraft(result);
    };

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">AI Draft Generator</h2>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Describe the legal draft you need</label>
                <textarea
                    placeholder="e.g. Draft a civil suit for recovery of money from a tenant..."
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition"
                />

                <button
                    onClick={handleGenerate}
                    className="bg-[#089CCE] text-white px-8 py-3.5 rounded-xl font-bold mt-4 hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20"
                >
                    Generate Draft
                </button>

                {draft && (
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-3 px-2">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Generated Result</h3>
                            <button 
                                onClick={() => navigator.clipboard.writeText(draft)}
                                className="text-xs font-bold text-[#089CCE] hover:underline"
                            >
                                Copy Text
                            </button>
                        </div>
                        <pre className="bg-gray-50 p-6 rounded-2xl whitespace-pre-wrap text-sm text-gray-700 border border-gray-100 leading-relaxed font-serif">
                            {draft}
                        </pre>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}


