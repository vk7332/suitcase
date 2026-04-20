import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";

export default function ActivityLog({ caseId }: any) {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const { data } = await supabase
                .from("audit_logs")
                .select("*")
                .eq("case_id", caseId)
                .order("created_at", { ascending: false });

            setLogs(data || []);
        };

        fetchLogs();

        // ✅ REALTIME SUBSCRIPTION
        const channel = supabase
            .channel("audit_logs_changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "audit_logs",
                    filter: `case_id=eq.${caseId}`,
                },
                (payload) => {
                    setLogs((prev) => [payload.new, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [caseId]);

    return (
        <div className="border p-4 rounded">

            <h3 className="font-semibold mb-3">
                Activity History
            </h3>

            {logs.length === 0 ? (
                <p className="text-gray-500">No activity yet</p>
            ) : (
                <div className="space-y-3">
                    {logs.map((log) => (
                        <div key={log.id} className="text-sm border-b pb-2">

                            <p className="font-medium">
                                {formatAction(log.action)}
                            </p>

                            <p className="text-gray-500 text-xs">
                                {new Date(log.created_at).toLocaleString()}
                            </p>

                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

function formatAction(action: string) {
    const map: any = {
        CASE_CREATED: "Case created",
        CASE_STATUS_UPDATED: "Case status updated",
        DOCUMENT_UPLOADED: "Document uploaded",
    };

    return map[action] || action;
}
