import { useEffect, useState } from "react";
import {
    getDrafts,
    addDraft,
    deleteDraft,
} from "../../services/DraftService";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DraftLibraryPage() {
    const [drafts, setDrafts] = useState<any[]>([]);
    const [form, setForm] = useState({
        title: "",
        category: "",
        content: "",
    });

    useEffect(() => {
        loadDrafts();
    }, []);

    const loadDrafts = async () => {
        const data = await getDrafts();
        setDrafts(data || []);
    };

    const handleSubmit = async () => {
        await addDraft(form);
        loadDrafts();
    };

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Draft Library</h2>

            {/* FORM */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Add New Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        placeholder="Template Title"
                        className="border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none"
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />

                    <input
                        placeholder="Category (e.g. Civil, Criminal)"
                        className="border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none"
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                    />
                </div>

                <textarea
                    placeholder="Draft Content..."
                    rows={6}
                    className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-[#089CCE] outline-none mb-4"
                    onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                    }
                />

                <button
                    onClick={handleSubmit}
                    className="bg-[#089CCE] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20"
                >
                    Save Template
                </button>
            </div>

            {/* LIST */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Saved Templates</h3>
                {drafts.length === 0 ? (
                    <div className="bg-white p-10 rounded-3xl border border-dashed border-gray-200 text-center">
                        <p className="text-gray-500">No drafts found. Add your first template above.</p>
                    </div>
                ) : (
                    drafts.map((d) => (
                        <div key={d.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{d.title}</h3>
                                    <span className="inline-block bg-blue-50 text-[#089CCE] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mt-1">
                                        {d.category}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteDraft(d.id)}
                                    className="text-red-400 hover:text-red-600 transition p-2"
                                >
                                    Delete
                                </button>
                            </div>
                            <pre className="bg-gray-50 p-4 rounded-xl whitespace-pre-wrap text-sm text-gray-600 font-serif border border-gray-50">
                                {d.content}
                            </pre>
                        </div>
                    ))
                )}
            </div>
        </DashboardLayout>
    );
}


