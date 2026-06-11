import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { createCase } from "@/services/case-service";
import { supabase } from "@/utils/supabase/supabase-client";

export default function CreateCasePage() {
    const navigate = useNavigate();
const [clientId, setClientId] = useState<string>("");
const [clients, setClients] = useState<Array<any>>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
    loadClients();
}, []);

const loadClients = async () => {
    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("client_name");

    if (!error && data) {
        setClients(data);
    }
};

    // CASE FIELDS
    const [caseTitle, setCaseTitle] = useState("");
    const [caseNumber, setCaseNumber] = useState("");
    const [courtName, setCourtName] = useState("");

    const [caseType, setCaseType] = useState("Civil");

    const [partyType, setPartyType] = useState("Plaintiff");
    const [nextDate, setNextDate] = useState("");

    const [cnrNumber, setCnrNumber] = useState("");
    // DEMO eCourts autofill
    const fetchFromCNR = async () => {
        if (!cnrNumber) {
            alert("Enter CNR Number");
            return;
        }

        setLoading(true);

        try {
            // DEMO MOCK DATA
            // Later we connect real API/scraper

            setTimeout(() => {
                setCaseTitle("Sukh Pal vs Barfu Ram");

                setCaseNumber("425/2025");

                setCourtName("Civil Judge Senior Division, TC Sarkaghat");

                setNextDate("2026-06-29");

                alert("Case details fetched successfully");
            }, 1000);

        } catch (err) {
            console.error(err);
            alert("Case not found");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            setLoading(true);

            const createdCase = await createCase({
                case_title: caseTitle,
                case_number: caseNumber,
                court_name: courtName,
                client_id: clientId || null,
                status: "active",
            });

            navigate(`/advocate/cases/${createdCase.id}`);

        } catch (err: any) {
            console.error(err);

            alert(err.message || "Failed to create case");

        } finally {
            setLoading(false);
        }
    };

    // clientId and setClientId are used for the selected client

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            Case Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Track and manage your legal cases
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/advocate/cases")}
                        className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-2xl font-semibold"
                    >
                        Cancel
                    </button>
                </div>

                {/* MAIN CARD */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                    <h2 className="text-2xl font-bold mb-8">
                        New Case Details
                    </h2>

                    {/* CNR SEARCH */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">

                        <h3 className="font-bold text-lg text-[#089CCE] mb-3">
                            Fetch Case From eCourts
                        </h3>

                        <div className="flex gap-4">

                            <input
                                type="text"
                                value={cnrNumber}
                                onChange={(e) =>
                                    setCnrNumber(e.target.value)
                                }
                                placeholder="Paste CNR Number (e.g. HPMA110001192025)"
                                className="flex-1 border border-gray-300 rounded-2xl px-4 py-3"
                            />

                            <button
                                onClick={fetchFromCNR}
                                disabled={loading}
                                className="bg-[#089CCE] hover:bg-[#067aa3] text-white px-6 py-3 rounded-2xl font-bold"
                            >
                                {loading ? "Fetching..." : "Fetch"}
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mt-3">
                            Paste CNR Number to auto-fill case details from eCourts.
                        </p>
                    </div>

                    {/* FORM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* CASE TITLE */}
                        <div>
                            <label className="block mb-2 font-semibold">
                                Case Title
                            </label>

                            <input
                                value={caseTitle}
                                onChange={(e) =>
                                    setCaseTitle(e.target.value)
                                }
                                className="w-full border rounded-2xl px-4 py-3"
                                placeholder="e.g. State vs John Doe"
                            />
                        </div>

                        {/* CASE NUMBER */}
                        <div>
                            <label className="block mb-2 font-semibold">
                                Case Number
                            </label>

                            <input
                                value={caseNumber}
                                onChange={(e) =>
                                    setCaseNumber(e.target.value)
                                }
                                className="w-full border rounded-2xl px-4 py-3"
                                placeholder="e.g. CRM-123-2026"
                            />
                        </div>

                        {/* CASE TYPE */}
                        <div>
                            <label className="block mb-2 font-semibold">
                                Nature of Case
                            </label>

                            <select
                                value={caseType}
                                onChange={(e) =>
                                    setCaseType(e.target.value)
                                }
                                className="w-full border rounded-2xl px-4 py-3"
                            >
                                <option value="Civil">Civil</option>
                                <option value="Criminal">Criminal</option>
                            </select>
                        </div>

                        {/* PARTY TYPE */}
                        <div>
                            <label className="block mb-2 font-semibold">
                                Party Type
                            </label>

                            <select
                                value={partyType}
                                onChange={(e) =>
                                    setPartyType(e.target.value)
                                }
                                className="w-full border rounded-2xl px-4 py-3"
                            >
                                <option value="Plaintiff">
                                    Plaintiff
                                </option>

                                <option value="Defendant">
                                    Defendant
                                </option>

                                <option value="Petitioner">
                                    Petitioner
                                </option>

                                <option value="Respondent">
                                    Respondent
                                </option>
                            </select>
                        </div>

                        {/* CLIENT */}
<div>
    <label className="block text-sm font-semibold mb-2">
        Client
    </label>

    <select
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="w-full border rounded-xl p-3"
    >
        <option value="">
            Select Client
        </option>

        {clients.map((client) => (
            <option
                key={client.id}
                value={client.id}
            >
                {client.client_name}
            </option>
        ))}
    </select>
</div>

                        {/* NEXT DATE */}
                        <div>
                            <label className="block mb-2 font-semibold">
                                Next Hearing Date
                            </label>

                            <input
                                type="date"
                                value={nextDate}
                                onChange={(e) =>
                                    setNextDate(e.target.value)
                                }
                                className="w-full border rounded-2xl px-4 py-3"
                            />
                        </div>

                        {/* COURT NAME */}
                        <div className="md:col-span-2">
                            <label className="block mb-2 font-semibold">
                                Court Name
                            </label>

                            <input
                                value={courtName}
                                onChange={(e) =>
                                    setCourtName(e.target.value)
                                }
                                className="w-full border rounded-2xl px-4 py-3"
                                placeholder="e.g. Punjab & Haryana High Court"
                            />
                        </div>

                    </div>

                    {/* ACTION */}
                    <div className="mt-10">
                        <button
                            onClick={handleCreate}
                            disabled={loading}
                            className="bg-[#089CCE] hover:bg-[#067aa3] text-white px-10 py-4 rounded-2xl font-bold text-lg"
                        >
                            {loading ? "Creating..." : "Create Case"}
                        </button>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}

