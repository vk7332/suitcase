import { supabase } from "../config/supabase";

export const logAction = async ({
    userId,
    caseId,
    action,
    metadata = {},
}: {
    userId: string;
    caseId?: string;
    action: string;
    metadata?: any;
}) => {
    try {
        await supabase.from("audit_logs").insert([
            {
                user_id: userId,
                case_id: caseId,
                action,
                metadata,
            },
        ]);
    } catch (err) {
        console.error("Audit log failed:", err);
    }
};