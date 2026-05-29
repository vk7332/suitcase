import { useSubscription } from "../../hooks/use-subscription";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabase-client";
import { useAuth } from "../../hooks/use-auth";
import { useCourtMapping } from "../../hooks/use-court-mapping";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CasesPage() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const mapping = useCourtMapping();

    const [cases, setCases] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);

    const [form, setForm] = useState({
        title: "",
        case_number: "",
        client_id: "",
        status: "active",
        next_date: "",
    });

    // 🔄 LOAD DATA
    useEffect(() => {
        if (!user) return;

        loadCases();
        loadClients();

        // 🔥 REALTIME
        const channel = supabase
            .channel("cases")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "cases" },
                () => loadCases()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    // 📥 FETCH CASES
    const loadCases = async () => {
        const { data } = await supabase
            .from("cases")
            .select("*, clients(client_name)")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        setCases(data || []);
    };

    // 📥 FETCH CLIENTS
    const loadClients = async () => {
        const { data } = await supabase
            .from("clients")
            .select("*")
            .eq("user_id", user.id);

        setClients(data || []);
    };

    const handleAddCase = async () => {
        if (!form.title) return alert("Enter case title");

        const { error } = await supabase.from("cases").insert([
            {
                ...form,
                user_id: user.id,
            },
        ]);

        if (error) {
            alert(error.message);
        } else {
            setShowAddForm(false);
            setForm({
                title: "",
                case_number: "",
                client_id: "",
                status: "active",
                next_date: "",
            });
            loadCases();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        await supabase.from("cases").delete().eq("id", id);
        loadCases();
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Case Management</h1>
                        <p className="text-gray-500">Track and manage your legal cases</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-[#089CCE] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20"
                    >
                        {showAddForm ? "Cancel" : "Add New Case"}
                    </button>
                </div>

                {showAddForm && (
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 mb-8 animate-in slide-in-from-top-4 duration-300">
                        <h2 className="text-xl font-bold mb-6">New Case Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Case Title</label>
                                <input
                                    placeholder="e.g. State vs John Doe"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Case Number</label>
                                <input
                                    placeholder="e.g. CRM-123-2026"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none"
                                    value={form.case_number}
                                    onChange={(e) => setForm({ ...form, case_number: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Client</label>
                                <select
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none bg-white"
                                    value={form.client_id}
                                    onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                                >
                                    <option value="">Select Client</option>
                                    {clients.map(c => (
                                        <option key={c.id} value={c.id}>{c.client_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Next Hearing Date</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#089CCE] outline-none"
                                    value={form.next_date}
                                    onChange={(e) => setForm({ ...form, next_date: e.target.value })}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleAddCase}
                            className="mt-8 bg-gray-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-gray-800 transition"
                        >
                            Create Case
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((c) => (
                        <div key={c.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#089CCE] text-xl">
                                    ⚖️
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {c.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#089CCE] transition">{c.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{c.case_number}</p>
                            
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Client:</span>
                                    <span className="font-semibold">{c.clients?.client_name || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Next Date:</span>
                                    <span className="font-semibold">{c.next_date ? new Date(c.next_date).toLocaleDateString() : 'Not Set'}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/advocate/cases/${c.id}`)}
                                    className="flex-1 bg-gray-50 text-gray-700 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition"
                                >
                                    Open Case
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {cases.length === 0 && !showAddForm && (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <div className="text-5xl mb-4">📂</div>
                        <h3 className="text-xl font-bold text-gray-900">No cases found</h3>
                        <p className="text-gray-500 mb-8">Get started by adding your first legal case.</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-[#089CCE] text-white px-8 py-3 rounded-xl font-bold"
                        >
                            Add Your First Case
                        </button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}



