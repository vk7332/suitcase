import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
                .toLowerCase()                .includes(search.toLowerCase())
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