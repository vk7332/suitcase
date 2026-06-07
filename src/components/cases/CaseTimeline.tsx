import { useEffect, useState } from "react";

import {
    createTimelineEvent,
    getCaseTimeline,
} from "@/services/case-timeline-service";

type Props = {
    caseId: string;
};

export default function CaseTimeline({ caseId }: Props) {
    const [events, setEvents] = useState<any[]>([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hearingDate, setHearingDate] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTimeline();
    }, [caseId]);

    const loadTimeline = async () => {
        try {
            const data = await getCaseTimeline(caseId);
            setEvents(data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async () => {
        if (!title) {
            alert("Event title required");
            return;
        }

        try {
            setLoading(true);

            await createTimelineEvent({
                case_id: caseId,
                title,
                description,
                hearing_date: hearingDate || null,
                event_type: "hearing",
            });

            setTitle("");
            setDescription("");
            setHearingDate("");

            await loadTimeline();
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 mt-6">

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Case Timeline
                </h2>

                <p className="text-gray-500 mt-1">
                    Hearings, orders, and litigation progress.
                </p>
            </div>

            {/* CREATE EVENT */}

            <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50 space-y-4">

                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3"
                />

                <textarea
                    placeholder="Description / Proceedings"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 min-h-[100px]"
                />

                <input
                    type="datetime-local"
                    value={hearingDate}
                    onChange={(e) => setHearingDate(e.target.value)}
                    className="border border-gray-200 rounded-xl p-3"
                />

                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="bg-[#089CCE] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#078bb8] transition disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Add Timeline Event"}
                </button>
            </div>

            {/* TIMELINE */}

            <div className="mt-8 space-y-5">

                {events.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No timeline events yet.
                    </div>
                )}

                {events.map((event) => (
                    <div
                        key={event.id}
                        className="border-l-4 border-[#089CCE] bg-blue-50/30 rounded-r-2xl p-5"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-gray-900">
                                {event.title}
                            </h3>

                            <span className="text-xs bg-[#089CCE] text-white px-3 py-1 rounded-full">
                                {event.event_type}
                            </span>
                        </div>

                        {event.hearing_date && (
                            <p className="text-sm text-gray-500 mt-2">
                                📅{" "}
                                {new Date(
                                    event.hearing_date
                                ).toLocaleString()}
                            </p>
                        )}

                        {event.description && (
                            <p className="mt-3 text-gray-700 whitespace-pre-wrap">
                                {event.description}
                            </p>
                        )}

                        {event.order_summary && (
                            <div className="mt-3 bg-white border border-gray-100 rounded-xl p-3">
                                <p className="text-sm font-semibold text-gray-700">
                                    Order Summary
                                </p>

                                <p className="text-sm text-gray-600 mt-1">
                                    {event.order_summary}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}