import { supabase } from "@/utils/supabase/supabase-client";

// 🔹 get client cases
export const getClientCases = async () => {
    const { data, error } = await supabase
        .from("cases")
        .select("*");

    if (error) throw error;

    return data;
};

// 🔹 get documents of a case
export const getClientDocuments = async (caseId: string) => {
    const { data, error } = await supabase
        .from("case_documents")
        .select("*")
        .eq("case_id", caseId);

    if (error) throw error;

    return data;
};
