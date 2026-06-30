import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

interface Props {
    caseId: string | number;
}

export default function HearingAuditTrail({ caseId }: Props) {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (caseId == null) return;

        let cancelled = false;

        const loadLogs = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase
                    .from("hearing_audit_logs")
                    .select("*")
                    .eq("case_id", caseId)
                    .order("created_at", { ascending: false });

                if (cancelled) return;

                if (error) throw error;

                setLogs(data || []);
            } catch (err) {
                console.error(err);
                if (!cancelled) {
                    setLogs([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadLogs();

        const channel = supabase
            .channel(`audit-${caseId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "hearing_audit_logs",
                    filter: `case_id=eq.${caseId}`,
                },
                () => {
                    void loadLogs();
                }
            )
            .subscribe();

        return () => {
            cancelled = true;
            supabase.removeChannel(channel);
        };
    }, [caseId]);

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Hearing Audit Trail</h2>

            {loading ? (
                <p>Loading audit logs...</p>
            ) : logs.length === 0 ? (
                <p className="text-gray-500">No audit activity yet.</p>
            ) : (
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="border rounded-2xl p-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-semibold">{log.action}</p>

                                    {log.old_value && (
                                        <p className="text-sm text-red-600">
                                            Old: {log.old_value}
                                        </p>
                                    )}

                                    {log.new_value && (
                                        <p className="text-sm text-green-600">
                                            New: {log.new_value}
                                        </p>
                                    )}
                                </div>

                                <div className="text-sm text-gray-500">
                                    {new Date(log.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
