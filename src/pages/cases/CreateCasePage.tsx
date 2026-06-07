import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { createCase } from "@/services/case-service";

export default function CreateCasePage() {
    const navigate = useNavigate();

    const [caseTitle, setCaseTitle] = useState("");
    const [caseNumber, setCaseNumber] = useState("");
    const [courtName, setCourtName] = useState("");

    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!caseTitle) {
            alert("Case title is required");
            return;
        }

        try {
            setLoading(true);

            const createdCase = await createCase({
                case_title: caseTitle,
                case_number: caseNumber,
                court_name: courtName,
                status: "active"
            });

            navigate(`/advocate/cases/${createdCase.id}`);
        } catch (err: any) {
            console.error(err);

            alert(
                err.message || "Failed to create case"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create New Case
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Start managing a new litigation matter.
                    </p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Case Title
                        </label>

                        <input
                            value={caseTitle}
                            onChange={(e) =>
                                setCaseTitle(e.target.value)
                            }
                            placeholder="e.g. Sharma vs State of Punjab"
                            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#089CCE]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Case Number
                        </label>

                        <input
                            value={caseNumber}
                            onChange={(e) =>
                                setCaseNumber(e.target.value)
                            }
                            placeholder="e.g. CRM-M-1234-2026"
                            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#089CCE]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Court Name
                        </label>

                        <input
                            value={courtName}
                            onChange={(e) =>
                                setCourtName(e.target.value)
                            }
                            placeholder="e.g. Punjab & Haryana High Court"
                            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#089CCE]"
                        />
                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="bg-[#089CCE] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#078bb8] transition disabled:opacity-50"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Case"}
                    </button>

                </div>
            </div>
        </DashboardLayout>
    );
}