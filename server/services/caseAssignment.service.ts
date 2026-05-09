import { supabaseAdmin } from "../config/supabase";

export const assignUserToCase = async ({
    caseId,
    userId,
    role,
}: {
    caseId: string;
    userId: string;
    role: string;
}) => {
    const { data, error } = await supabaseAdmin
        .from("case_assignments")
        .insert([
            {
                case_id: caseId,
                user_id: userId,
                role,
            },
        ]);

    if (error) throw error;

    return data;
};

export const getCaseAssignments = async (caseId: string) => {
    const { data, error } = await supabaseAdmin
        .from("case_assignments")
        .select(`
      id,
      role,
      users (
        id,
        email,
        role
      )
    `)
        .eq("case_id", caseId);

    if (error) throw error;

    return data;
};