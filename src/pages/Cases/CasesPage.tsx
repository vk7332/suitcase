import { useSubscription } from "../../hooks/useSubscription";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";
import { useCourtMapping } from "../../hooks/useCourtMapping";

export default function CasesPage() {

    const { user, loading } = useAuth();

    const mapping = useCourtMapping();

    const [cases, setCases] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);

    const [form, setForm] = useState({
        title: "",
        case_number: "",
        client_id: "",
        status: "Pending",
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
            .select("*, clients(name)")
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

    // ➕ ADD CASE
    const { subscription } = useSubscription();

    const handleAddCase = async () => {
        if (!form.title) return alert("Enter case title");

        await supabase.from("cases").insert([
            {
                ...form,
                user_id: user.id,
                state: mapping.state,
                district: mapping.district,
                court: mapping.court,
            },
        ]);

        setForm({
            title: "",
            case_number: "",
            client_id: "",
            status: "Pending",
            next_date: "",
        });

        mapping.setState("");
        mapping.setDistrict("");
        mapping.setCourt("");
    };

    // ❌ DELETE
    const handleDelete = async (id: string) => {
        await supabase.from("cases").delete().eq("id", id);
    };

    if (loading) return <div className="p-6">Loading...</div>;

    if (!user) return <div className="p-6">Login required</div>;

    return (
        <div className="p-6">

            <h2 className="text-xl font-bold mb-4">
                Case Management
            </h2>

            {/* ➕ FORM */}
            <div className="border p-4 mb-6 space-y-3">

                <input
                    className="border p-2 w-full"
                    placeholder="Case Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />

                <input
                    className="border p-2 w-full"
                    placeholder="Case Number"
                    value={form.case_number}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            case_number: e.target.value,
                        })
                    }
                />

                {/* 👤 CLIENT DROPDOWN */}
                <select
                    className="border p-2 w-full"
                    value={form.client_id}
                    onChange={(e) =>
                        setForm({ ...form, client_id: e.target.value })
                    }
                >
                    <option value="">Select Client</option>
                    {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => sendWhatsAppReminder(caseData, client)}
                    className="bg-green-600 text-white p-2 mt-2"
                >
                    📲 Send WhatsApp Reminder
                </button>

                {/* ⚖️ COURT MAPPING */}
                <select
                    className="border p-2 w-full"
                    value={mapping.state}
                    onChange={(e) => {
                        mapping.setState(e.target.value);
                        mapping.setDistrict("");
                    }}
                >
                    <option value="">Select State</option>
                    {mapping.states.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>

                <select
                    className="border p-2 w-full"
                    value={mapping.district}
                    onChange={(e) => {
                        mapping.setDistrict(e.target.value);
                    }}
                >
                    <option value="">Select District</option>
                    {mapping.districts.map((d) => (
                        <option key={d}>{d}</option>
                    ))}
                </select>

                <select
                    className="border p-2 w-full"
                    value={mapping.court}
                    onChange={(e) =>
                        mapping.setCourt(e.target.value)
                    }
                >
                    <option value="">Select Court</option>
                    {mapping.courts.map((c: any) => (
                        <option key={c.code} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* 📊 STATUS */}
                <select
                    className="border p-2 w-full"
                    value={form.status}
                    onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                    }
                >
                    <option>Pending</option>
                    <option>Decided</option>
                </select>

                {/* 📅 NEXT DATE */}
                <input
                    type="date"
                    className="border p-2 w-full"
                    value={form.next_date}
                    onChange={(e) =>
                        setForm({ ...form, next_date: e.target.value })
                    }
                />

                <button
                    onClick={handleAddCase}
                    className="bg-blue-600 text-white p-2 w-full"
                >
                    {subscription?.plan === "FREE" && (
                        <span className="mr-1">🔓</span>
                    )}
                    Add Case
                </button>
            </div>

            {/* 📋 TABLE */}
            <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th>Title</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Next Date</th>
                        <th>Court</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {cases.map((c) => (
                        <tr key={c.id} className="border-t">

                            <td>{c.title}</td>

                            <td>{c.clients?.name}</td>

                            <td>
                                <span
                                    className={
                                        c.status === "Decided"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                    }
                                >
                                    {c.status}
                                </span>
                            </td>

                            <td>
                                {c.next_date
                                    ? new Date(c.next_date).toLocaleDateString()
                                    : "-"}
                            </td>

                            <td>{c.court}</td>

                            <td className="space-x-2">

                                <Link
                                    to={`/case/${c.id}`}
                                    className="text-blue-600"
                                >
                                    View
                                </Link>

                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}


