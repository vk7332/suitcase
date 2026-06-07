import { supabase } from "@/utils/supabase/supabase-client";

export async function getCaseTimeline(caseId: string) {
    const { data, error } = await supabase
        .from("case_timeline")
        .select("*")
        .eq("case_id", caseId)
        .order("hearing_date", { ascending: false });

    if (error) throw error;

    return data;
}

export async function createTimelineEvent(payload: any) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
        .from("case_timeline")
        .insert({
            ...payload,
            user_id: user.id,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}