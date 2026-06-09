import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getUpcomingHearings } from "@/services/dashboard-hearings-service";

export default function UpcomingHearingsCard() {
    const [hearings, setHearings] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHearings();
    }, []);

    const loadHearings = async () => {
        try {
            setLoading(true);

            const data =
                await getUpcomingHearings();

            setHearings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getDaysLabel = (date: string) => {
        const hearingDate = new Date(date);

        const today = new Date();

        const diff =
            Math.ceil(
                (
                    hearingDate.getTime() -
                    today.getTime()
                ) /
                (1000 * 60 * 60 * 24)
            );

        if (diff <= 0) return "TODAY";

        if (diff === 1) return "TOMORROW";

        return `IN ${diff} DAYS`;
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center justify-between mb-5">

                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Upcoming Hearings
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Next 7 days litigation schedule
                    </p>
                </div>

            </div>

            {loading ? (
                <div className="text-gray-500">
                    Loading hearings...
                </div>
            ) : hearings.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-gray-300 rounded-3xl bg-gray-50">

                    <p className="text-gray-500">
                        No upcoming hearings
                    </p>

                </div>
            ) : (
                <div className="space-y-4">

                    {hearings.map((hearing) => (

                        <Link
                            key={hearing.id}
                            to={`/advocate/cases/${hearing.case_id}`}
                            className="block border border-gray-100 rounded-2xl p-4 hover:border-[#089CCE] hover:shadow-sm transition"
                        >

                            <div className="flex items-start justify-between gap-4">

                                <div className="space-y-2">

                                    <h3 className="font-bold text-gray-900">
                                        {hearing.cases?.case_title}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {hearing.cases?.case_number}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {hearing.cases?.court_name}
                                    </p>

                                </div>

                                <div className="text-right">

                                    <div className="text-sm font-bold text-[#089CCE]">
                                        {new Date(
                                            hearing.hearing_date
                                        ).toLocaleDateString()}
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        {getDaysLabel(
                                            hearing.hearing_date
                                        )}
                                    </div>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>
            )}

        </div>
    );
}