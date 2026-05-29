import { supabaseAdmin } from "../config/supabase";

export const saveAuditReport = async ({
    chamber_id,
    hash,
    signature,
}: {
    chamber_id: string;
    hash: string;
    signature: string;
}) => {
    const { data, error } = await supabaseAdmin
        .from("audit_reports")
        .insert({
            chamber_id,
            hash,
            signature,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
};