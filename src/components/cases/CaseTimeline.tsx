import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

interface TimelineProps {
    caseId: string;
}

export default function Timeline({
    caseId,
}: TimelineProps) {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (caseId) {
            loadTimeline();
        }
    }, [caseId]);

    const loadTimeline = async () => {
        try {
            const { data, error } = await supabase
                .from("hearings")
                .select("*")
                .eq("case_id", caseId)
                .order("hearing_date", {
                    ascending: false,
                });

            if (error) {
                console.error(error);
                setEvents([]);
                return;
            }

            if (Array.isArray(data)) {
                setEvents(data);
            } else {
                setEvents([]);
            }
        } catch (err) {
            console.error(err);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mt-6">
            <h2 className="text-xl font-bold mb-6">
                Case Timeline
            </h2>

            {loading ? (
                <p>Loading timeline...</p>
            ) : events.length === 0 ? (
                <p className="text-gray-500">
                    No hearing events yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="border rounded-2xl p-4"
                        >
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold">
                                        {event.stage || "Hearing"}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {event.notes || "No notes"}
                                    </p>
                                </div>

                                <div className="text-sm text-gray-500">
                                    {event.hearing_date
                                        ? new Date(
                                              event.hearing_date
                                          ).toLocaleDateString()
                                        : "-"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}