import { useEffect, useState } from "react";

import {
    getHearings,
    deleteHearing,
} from "@/services/hearing-service";

import AddHearingModal from "./AddHearingModal";

type Props = {
    caseId: string;
};

export default function HearingsList({
    caseId,
}: Props) {
    const [hearings, setHearings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        loadHearings();
    }, [caseId]);

    const loadHearings = async () => {
        try {
            setLoading(true);

            const data = await getHearings(caseId);

            setHearings(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = confirm(
            "Delete this hearing?"
        );

        if (!confirmed) return;

        try {
            await deleteHearing(id);

            loadHearings();
        } catch (err: any) {
            console.error(err);

            alert(
                err.message ||
                "Failed to delete hearing"
            );
        }
    };

    const getStatusColor = (status?: string) => {
        switch (
        (status || "").toLowerCase()
        ) {
            case "scheduled":
                return "bg-blue-100 text-blue-700 border-blue-200";

            case "completed":
                return "bg-green-100 text-green-700 border-green-200";

            case "adjourned":
                return "bg-yellow-100 text-yellow-700 border-yellow-200";

            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div>

            {/* HEADER */}

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Hearings
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Track all hearing activity
                        and proceedings.
                    </p>
                </div>

                <button
                    onClick={() =>
                        setShowAdd(true)
                    }
                    className="bg-[#089CCE] text-white px-5 py-3 rounded-2xl font-bold hover:bg-[#078bb8]"
                >
                    Add Hearing
                </button>

            </div>

            {/* LIST */}

            {loading ? (
                <div className="text-gray-500">
                    Loading hearings...
                </div>
            ) : hearings.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-3xl p-10 text-center bg-gray-50">

                    <h3 className="text-lg font-semibold text-gray-700">
                        No hearings yet
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Add your first hearing
                        to start litigation tracking.
                    </p>

                </div>
            ) : (
                <div className="space-y-4">

                    {hearings.map((hearing) => (
                        <div
                            key={hearing.id}
                            className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6"
                        >

                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                                {/* LEFT */}

                                <div className="space-y-3 flex-1">

                                    <div className="flex items-center gap-3 flex-wrap">

                                        <h3 className="text-lg font-bold text-gray-900">

                                            {new Date(
                                                hearing.hearing_date
                                            ).toLocaleDateString()}

                                        </h3>

                                        <span
                                            className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(
                                                hearing.status
                                            )}`}
                                        >
                                            {(
                                                hearing.status ||
                                                "scheduled"
                                            ).toUpperCase()}
                                        </span>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                                        <div>
                                            <p className="text-gray-500">
                                                Stage
                                            </p>

                                            <p className="font-semibold">
                                                {hearing.stage || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                Created
                                            </p>

                                            <p className="font-semibold">
                                                {new Date(
                                                    hearing.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                    </div>

                                    {hearing.notes && (
                                        <div className="pt-3 border-t border-gray-100">

                                            <p className="text-gray-500 text-sm mb-1">
                                                Notes
                                            </p>

                                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                                {hearing.notes}
                                            </p>

                                        </div>
                                    )}

                                </div>

                                {/* ACTIONS */}

                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                hearing.id
                                            )
                                        }
                                        className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl font-semibold hover:bg-red-100"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}

            {/* MODAL */}

            {showAdd && (
                <AddHearingModal
                    caseId={caseId}
                    onClose={() =>
                        setShowAdd(false)
                    }
                    onCreated={loadHearings}
                />
            )}

        </div>
    );
}