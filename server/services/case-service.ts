import { supabase } from "../config/supabase";

export const getCasesByTenant = async (tenantId: string) => {
    const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
};