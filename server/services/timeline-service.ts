import { supabaseAdmin } from "../config/supabase.js";

export const addEvent = async (event: any) => {
    const { data, error } = await supabaseAdmin
        .from("case_events")
        .insert([event]);

    if (error) throw error;
    return data;
};

export const getTimeline = async (caseId: string) => {
    const { data, error } = await supabaseAdmin
        .from("case_events")
        .select("*")
        .eq("case_id", caseId)
        .order("event_date", { ascending: true });

    if (error) throw error;
    return data;
};

interface TimelineEvent {
    date: string;
    event: string;
}
