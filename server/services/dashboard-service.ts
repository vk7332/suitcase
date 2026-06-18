import { supabase } from "../config/supabase.js";
import { supabaseAdmin } from "../config/supabase.js";

export const getDashboardData = async (tenantId: string) => {
    // TODO: Implement real dashboard data fetching
    return {
        totalCases: 0,
        activeCases: 0,
        closedCases: 0,
        upcomingHearings: 0,
    };
};

export const addDocument = async (doc: any) => {
    const { data, error } = await supabaseAdmin
        .from("case_documents")
        .insert([doc]);

    if (error) throw error;
    return data;
};

export const getDocuments = async (caseId: string, role: string) => {
    let query = supabaseAdmin
        .from("case_documents")
        .select("*")
        .eq("case_id", caseId);

    // 🔐 visibility control
    if (role === "CLIENT" || role === "LITIGENT") {
        query = query.eq("visibility", "CLIENT_VISIBLE");
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
};
