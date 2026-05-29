import { supabase } from "@/utils/supabase/supabase-client";

// Simple mock hash function for frontend use
const generateHash = (data: any, prevHash: string) => {
    const str = JSON.stringify(data) + prevHash;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
};

export const createAuditLog = async (log: any) => {
    const { data: lastLog } = await supabase
        .from("audit_logs")
        .select("hash")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    const prevHash = lastLog?.hash || "GENESIS";

    const hash = generateHash(log, prevHash);

    await supabase.from("audit_logs").insert({
        ...log,
        prev_hash: prevHash,
        hash,
    });
};
