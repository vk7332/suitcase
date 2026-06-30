import { useEffect, useState } from "react";

import {
    getHearings, 
    deleteHearing,
} from "@/services/hearing-service";

import AddHearingModal from "./AddHearingModal";
import EditHearingModal from "./EditHearingModal";

type Props = {
    caseId: string;
    caseStatus?: string;
    onChanged?: () => void;
};

export default function HearingsList({
    caseId,
    caseStatus,
}: Props) {
    const [hearings, setHearings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedHearing, setSelectedHearing] = useState<any>(null);
    const [editingHearing, setEditingHearing] =
    useState<any>(null);
    const [showEdit, setShowEdit] = useState(false);
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

    const formatDate = (value?: string | Date | null): string => {
        if (!value) return "-";

        const date = value instanceof Date ? value : new Date(value);

        if (Number.isNaN(date.getTime())) return "-";

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);
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

{caseStatus !== "disposed" && (
    <button
        onClick={() => setShowAdd(true)}
        className="bg-[#089CCE] text-white px-5 py-3 rounded-2xl font-bold hover:bg-[#078bb8]"
    >
        Add Hearing
    </button>
)}

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
                            className="bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:shadow-md transition"
                        >

                            <div className="flex items-start justify-between">

                                <div className="flex-1">

                                    <div className="flex items-center gap-3">

                                        <span className="font-bold text-lg">
                                            {formatDate(hearing.hearing_date)}
                                        </span>

                                        <span
                                            className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${getStatusColor(
                                                hearing.status
                                            )}`}
                                        >
                                            {hearing.status || "Unknown"}
                                        </span>
                                    </div>

                                    <div className="mt-2 flex flex-wrap gap-8 text-sm">

                                        <div>

                                            <p className="text-gray-400">Stage</p>
                                            <p className="font-semibold">{hearing.stage}</p>

                                        </div>

                                        <div>

                                            <p className="text-gray-400">Notes</p>
                                            <p className="font-semibold">{hearing.notes || "-"}</p>

                                        </div>

                                        <div>

                                            <p className="text-gray-400">Created</p>
                                            <p className="font-semibold">
                                                {formatDate(hearing.created_at)}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="flex gap-2">
                                    <button className="btn-edit">Edit</button>
                                    <button className="btn-delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
