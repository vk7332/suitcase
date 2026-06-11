import DashboardLayout from "@/components/layout/DashboardLayout";

import { openECourt } from "@/utils/ecourts";

const openCauseList = () => openECourt();
const openJudgments = () => openECourt();

export default function eCourtsHubPage() {

    return (
        <DashboardLayout>

            <div className="max-w-5xl mx-auto p-6">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-gray-900">
                        ⚖️ eCourts Hub
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Access official Indian judiciary services.
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <button
                        onClick={() => openECourt()}
                        className="bg-blue-600 text-white rounded-3xl p-8 text-left hover:bg-blue-700 transition"
                    >
                        <div className="text-2xl mb-3">
                            🏛️
                        </div>

                        <h2 className="text-xl font-bold">
                            Open eCourts
                        </h2>

                        <p className="mt-2 text-blue-100">
                            Search cases, orders and hearing status.
                        </p>
                    </button>

                    <button
                        onClick={() => openCauseList()}
                        className="bg-orange-600 text-white rounded-3xl p-8 text-left hover:bg-orange-700 transition"
                    >
                        <div className="text-2xl mb-3">
                            📋
                        </div>

                        <h2 className="text-xl font-bold">
                            Cause List
                        </h2>

                        <p className="mt-2 text-orange-100">
                            Open official cause list services.
                        </p>
                    </button>

                    <button
                        onClick={() => openJudgments()}
                        className="bg-purple-700 text-white rounded-3xl p-8 text-left hover:bg-purple-800 transition"
                    >
                        <div className="text-2xl mb-3">
                            ⚖️
                        </div>

                        <h2 className="text-xl font-bold">
                            Judgments
                        </h2>

                        <p className="mt-2 text-purple-100">
                            Search judgments and orders.
                        </p>
                    </button>

                </div>

            </div>

        </DashboardLayout>
    );
}