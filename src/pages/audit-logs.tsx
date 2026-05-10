import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function AuditLogs() {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const { data } = await supabase
                .from("document_access_logs")
                .select("*")
                .order("created_at", { ascending: false });

            setLogs(data || []);
        };

        fetchLogs();
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Audit Trail</h2>

            {logs.map((log) => (
                <div key={log.id} style={{ borderBottom: "1px solid #ccc" }}>
                    <p><b>Doc:</b> {log.document_id}</p>
                    <p><b>Type:</b> {log.access_type}</p>
                    <p><b>User:</b> {log.user_id || "Client"}</p>
                    <p><b>IP:</b> {log.ip_address}</p>
                    <p><b>Time:</b> {new Date(log.created_at).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}
