import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabase-client";
import { useRealtimeCases } from "@/hooks/use-realtime-cases";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CasesTable from "@/components/cases/CasesTable";

import {
    getCases,
    deleteCase,
} from "@/services/case-service";

import {
    openCaseStatusSearch,
} from "@/utils/ecourts";

export default function CasesPage() {
const [cases, setCases] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const navigate = useNavigate();

const openCaseStatus = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index&app_token=",
        "_blank"
    );
};

const openCnrSearch = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=home/index&app_token=nrsearch/index&app_token=",
        "_blank"
    );
};

const openAdvocateSearch = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index&app_token=",
        "_blank"
    );
};

const openCauseList = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=cause_list/index&app_token=",
        "_blank"
    );
};

const openJudgments = () => {
    window.open(
        "https://services.ecourts.gov.in/ecourtindia_v6/?p=courtorder/index&app_token=",
        "_blank"
    );
};

const loadCases = async () => {
    try {
        const data = await getCases();
        setCases(data || []);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    loadCases();

    const channel = supabase
        .channel("cases-live")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "cases",
            },
            () => {
                loadCases();
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}, []);

const handleEdit = (
    c: any
) => {
    navigate(
        `/advocate/cases/${c.id}`
    );
};

const filteredCases =
    cases.filter(
        (c) =>
            c.case_title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            c.case_number

                .toLowerCase()
                .includes(search.toLowerCase()) ||
            c.client_side

                .toLowerCase()
                .includes(search.toLowerCase()) ||
            c.court_name
                .toLowerCase()                
                .includes(search.toLowerCase())
    );
    
const handleDelete = async (
    id: string
) => {
    const confirmed =
        window.confirm(
            "Delete this case?"
        );

    if (!confirmed) return;

    await deleteCase(id);

    setCases((prev) =>
        prev.filter(
            (c) => c.id !== id
        )
    );
};

    return (

        <DashboardLayout>

            <div className="max-w-7xl mx-auto">

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
                </div>

    <button
        onClick={openCnrSearch}
        className="bg-indigo-600 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            CNR Search
        </div>

        <p className="text-sm mt-2">
            Search directly using CNR number.
        </p>
    </button>

    <button
        onClick={openAdvocateSearch}
        className="bg-emerald-600 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            Advocate Search
        </div>

        <p className="text-sm mt-2">
            Find cases linked to advocate details.
        </p>
    </button>

    <button
        onClick={openCauseList}
        className="bg-orange-500 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            Cause List
        </div>

        <p className="text-sm mt-2">
            Daily court cause lists.
        </p>
    </button>

    <button
        onClick={openJudgments}
        className="bg-purple-600 text-white rounded-2xl p-5 text-left hover:opacity-90"
    >
        <div className="text-xl font-bold">
            Judgments
        </div>

        <p className="text-sm mt-2">
            Search court judgments.
        </p>
    </button>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 justify-between">

                        {/* Search */}

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, number, client, court..."
                            className="flex-1 border rounded-2xl px-5 py-3"
                        />

                        {/* Actions */}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={openCaseStatusSearch}
                                className="rounded-2xl bg-blue-600 text-white px-5 py-3"
                            >
                                Add from eCourts
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/advocate/cases/create")}
                                className="rounded-2xl bg-green-600 text-white px-5 py-3"
                            >
                                Add New Case
                            </button>
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                    <CasesTable
                        cases={filteredCases}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

            </div>

        </DashboardLayout>
    );
}