import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
    getTodayCauseList,
    getUpcomingCauseList,
} from "@/services/cause-list-service";

export default function CauseListPage() {
    const [todayHearings, setTodayHearings] =
        useState<any[]>([]);

    const [upcomingHearings, setUpcomingHearings] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            const today =
                await getTodayCauseList();

            const upcoming =
                await getUpcomingCauseList();

            setTodayHearings(today);

            setUpcomingHearings(upcoming);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const groupedHearings = useMemo(() => {
        const grouped: Record<
            string,
            any[]
        > = {};

        upcomingHearings.forEach(
            (hearing) => {
                const court =
                    hearing.cases?.court_name ||
                    "Unknown Court";

                if (!grouped[court]) {
                    grouped[court] = [];
                }

                grouped[court].push(
                    hearing
                );
            }
        );

        return grouped;
    }, [upcomingHearings]);

    return (
        <DashboardLayout>

            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* HEADER */}

                <div className="flex items-center justify-between flex-wrap gap-4">

                    <div>
                        <h1 className="text-4xl font-black text-gray-900">
                            Cause List
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Daily litigation schedule
                            and court board.
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            window.print()
                        }
                        className="bg-[#089CCE] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#078bb8]"
                    >
                        Print Cause List
                    </button>

                </div>

                {/* TODAY */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-2xl font-bold">
                                Today's Hearings
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Priority litigation board
                            </p>
                        </div>

                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : todayHearings.length === 0 ? (
                        <div className="text-center py-10 border border-dashed rounded-3xl bg-gray-50">

                            <p className="text-gray-500">
                                No hearings today
                            </p>

                        </div>
                    ) : (
                        <div className="space-y-4">

                            {todayHearings.map(
                                (hearing) => (
                                    <div
                                        key={
                                            hearing.id
                                        }
                                        className="border border-red-200 bg-red-50 rounded-2xl p-5"
                                    >

                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">

                                                    {
                                                        hearing
                                                            .cases
                                                            ?.case_title
                                                    }

                                                </h3>

                                                <p className="text-sm text-gray-600 mt-1">

                                                    {
                                                        hearing
                                                            .cases
                                                            ?.case_number
                                                    }

                                                </p>

                                                <p className="text-sm text-gray-600">

                                                    {
                                                        hearing
                                                            .cases
                                                            ?.court_name
                                                    }

                                                </p>
                                            </div>

                                            <div className="text-right">

                                                <div className="text-sm font-bold text-red-700">
                                                    TODAY
                                                </div>

                                                <div className="text-sm text-gray-500 mt-1">
                                                    {
                                                        hearing.stage
                                                    }
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>

                {/* COURT GROUPING */}

                <div className="space-y-6">

                    {Object.entries(
                        groupedHearings
                    ).map(
                        ([court, hearings]) => (
                            <div
                                key={court}
                                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
                            >

                                <div className="mb-5">

                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {court}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">

                                        {
                                            hearings.length
                                        }{" "}
                                        hearing(s)

                                    </p>

                                </div>

                                <div className="space-y-4">

                                    {hearings.map(
                                        (
                                            hearing: any
                                        ) => (
                                            <div
                                                key={
                                                    hearing.id
                                                }
                                                className="border border-gray-100 rounded-2xl p-5 hover:border-[#089CCE] transition"
                                            >

                                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                                    <div>

                                                        <h3 className="font-bold text-gray-900">

                                                            {
                                                                hearing
                                                                    .cases
                                                                    ?.case_title
                                                            }

                                                        </h3>

                                                        <p className="text-sm text-gray-600 mt-1">

                                                            {
                                                                hearing
                                                                    .cases
                                                                    ?.case_number
                                                            }

                                                        </p>

                                                        <p className="text-sm text-gray-500 mt-2">
                                                            Status:{" "}
                                                            {
                                                                hearing.status
                                                            }
                                                        </p>

                                                    </div>

                                                    <div className="text-right">

                                                        <div className="font-bold text-[#089CCE]">

                                                            {new Date(
                                                                hearing.hearing_date
                                                            ).toLocaleDateString()}

                                                        </div>

                                                        <div className="text-sm text-gray-500 mt-1">

                                                            {
                                                                hearing.stage
                                                            }

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>

        </DashboardLayout>
    );
}