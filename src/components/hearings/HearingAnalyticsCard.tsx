import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

type Props = {
    caseId: string;
    onChanged?: () => void;
};

export default function HearingAnalyticsCard({
    caseId,
}: Props) {
    const [stats, setStats] = useState({
        total: 0,
        scheduled: 0,
        adjourned: 0,
        completed: 0,
        disposed: 0,
    });
    const [caseInfo, setCaseInfo] = useState<any>(null);

    useEffect(() => {
        if (!caseId) return;

        let cancelled = false;

        const loadStats = async () => {
            const [
                hearingsResult,
                caseResult,
            ] = await Promise.all([

                supabase
                    .from("hearings")
                    .select("status")
                    .eq("case_id", caseId),

                supabase
                    .from("cases")
                    .select(`
                        status,
                        disposal_reason,
                        disposed_date
                    `)
                    .eq("id", caseId)
                    .single(),
            ]);

            if (hearingsResult.error) {
                return;
            }

            const { data } = hearingsResult;
            const newStats = {
                total: data?.length ?? 0,
                scheduled: 0,
                adjourned: 0,
                completed: 0,
                disposed: 0,
            };

            data?.forEach((hearing: any) => {
                switch (hearing.status) {
                    case "scheduled":
                        newStats.scheduled += 1;
                        break;
                    case "adjourned":
                        newStats.adjourned += 1;
                        break;
                    case "completed":
                        newStats.completed += 1;
                        break;
                    case "disposed":
                        newStats.disposed += 1;
                        break;
                    default:
                        break;
                }
            });

            if (!cancelled) {
                setStats(newStats);
            }

            if (!caseResult.error && !cancelled) {
                setCaseInfo(caseResult.data);
            }
        };

        void loadStats();

        const channel = supabase
            .channel(`analytics-${caseId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "hearings",
                    filter: `case_id=eq.${caseId}`,
                },
                () => {
                    void loadStats();
                }
            )
            .subscribe();

        return () => {
            cancelled = true;
            supabase.removeChannel(channel);
        };
    }, [caseId]);

    return (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 mb-6">

            <h2 className="text-xl font-bold mb-5">
                Hearing Analytics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                        Total
                    </p>
                    <p className="text-3xl font-bold">
                        {stats.total}
                    </p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                        Scheduled
                    </p>
                    <p className="text-3xl font-bold">
                        {stats.scheduled}
                    </p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                        Adjourned
                    </p>
                    <p className="text-3xl font-bold">
                        {stats.adjourned}
                    </p>
                </div>

                <div className="bg-green-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                        Completed
                    </p>
                    <p className="text-3xl font-bold">
                        {stats.completed}
                    </p>
                </div>

<div className="bg-red-50 rounded-2xl p-4">

    <p className="text-sm text-gray-500">
        Disposed
    </p>

    <p className="text-3xl font-bold">
        {stats.disposed}
    </p>

    {caseInfo?.status === "disposed" && (
        <>

            <p className="text-red-700 text-sm font-semibold mt-2">
                {caseInfo.disposal_reason}
            </p>

            <p className="text-xs text-red-500">
                {caseInfo.disposed_date
                    ? new Date(
                          caseInfo.disposed_date
                      ).toLocaleDateString()
                    : ""}
            </p>

        </>
    )}

</div>
            </div>

        </div>
    );
}