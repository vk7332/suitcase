import crypto from "crypto";
import { supabaseAdmin } from "../config/supabase.js";

export const generateHash = (data: string) => {
    return crypto.createHash("sha256").update(data).digest("hex");
};

export const createAuditLog = async ({
    action,
    user_id,
    chamber_id,
    metadata = {},
}: {
    action: string;
    user_id: string;
    chamber_id: string;
    metadata?: any;
}) => {
    try {
        // 1. Get last hash
        const { data: lastLog } = await supabaseAdmin
            .from("audit_logs")
            .select("hash")
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

        const prevHash = lastLog?.hash || "GENESIS";

        // 2. Create new hash
        const raw = `${action}|${user_id}|${chamber_id}|${prevHash}|${JSON.stringify(
            metadata
        )}`;

        const hash = generateHash(raw);

        // 3. Insert log
        await supabaseAdmin.from("audit_logs").insert({
            action,
            user_id,
            chamber_id,
            metadata,
            prev_hash: prevHash,
            hash,
        });
    } catch (err) {
        console.error("Audit log error:", err);
    }
};