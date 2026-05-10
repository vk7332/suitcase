import { supabase, supabaseAdmin } from "../config/supabase";
import { generateHash } from "../utils/hash.util";

export const createAuditLog = async (log: Record<string, unknown>) => {
    const { data: lastLog } = await supabaseAdmin
        .from("audit_logs")
        .select("hash")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    const prevHash = lastLog?.hash || "GENESIS";

    const hash = generateHash(Buffer.from(`${JSON.stringify(log)}|${prevHash}`));

    await supabaseAdmin.from("audit_logs").insert({
        ...log,
        prev_hash: prevHash,
        hash,
    });
};

export const logAudit = async ({
    user_id,
    chamber_id,
    action,
    entity,
    entity_id,
    meta = {},
}: {
    user_id: string;
    chamber_id?: string;
    action: string;
    entity: string;
    entity_id: string;
    meta?: Record<string, unknown>;
}) => {
    await supabase.from("audit_logs").insert([
        {
            user_id,
            organization_id: meta.org_id,
            action,
            entity,
            entity_id,
            meta,
        },
    ]);
};

export const getAuditLogs = async (chamber_id: string) => {
    const { data, error } = await supabaseAdmin
        .from("audit_logs")
        .select("*")
        .eq("chamber_id", chamber_id)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getAuditLogsByEntity = async (
    chamber_id: string,
    entity: string,
    entity_id: string
) => {
    const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("chamber_id", chamber_id)
        .eq("entity", entity)
        .eq("entity_id", entity_id)
        .order("created_at", { ascending: false });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getAuditLogsByUser = async (chamber_id: string, user_id: string) => {
    const { data, error } = await supabase
        .from("audit_logs").select("*")
        .eq("chamber_id", chamber_id)
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getAuditLogsByDateRange = async (
    chamber_id: string,
    start_date: string,
    end_date: string
) => {
    const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("chamber_id", chamber_id)
        .gte("created_at", start_date)
        .lte("created_at", end_date)
        .order("created_at", { ascending: false });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getAuditLogsByMeta = async (
    chamber_id: string,
    meta_key: string,
    meta_value: string
) => {
    const { data, error } = await supabase
        .from("audit_logs").select("*")
        .eq("chamber_id", chamber_id)
        .contains("meta", { [meta_key]: meta_value })
        .order("created_at", { ascending: false });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};
