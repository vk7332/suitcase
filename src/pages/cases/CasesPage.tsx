import { Link } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
    openCaseStatusSearch,
} from "@/utils/ecourts";

export default function CasesPage() {
  to: "/advocate/cases"

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

                    <div className="flex gap-4">

                        <button
                            onClick={() =>
                                openCaseStatusSearch()
                            }
                            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold"
                        >
                            Add from eCourts
                        </button>

                        <Link
                            to="/advocate/cases/create"
                            className="bg-[#089CCE] text-white px-6 py-3 rounded-2xl font-bold"
                        >
                            Add New Case
                        </Link>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}