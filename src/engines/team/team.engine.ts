import { supabase } from "@/utils/supabase/supabaseclient";

export const getTeamMembers = async (organizationId: string) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, role")
        .eq("organization_id", organizationId);

    if (error) throw error;

    return data;
};

export const updateMemberRole = async (
    memberId: string,
    newRole: string
) => {
    const { data, error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", memberId)
        .select("id, name, email, role")
        .single();
