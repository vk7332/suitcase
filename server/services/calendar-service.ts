import { supabase } from "../config/supabase.js";

export const addEvent = async (data: any) => {
    return await supabase.from("case_events").insert([data]);
};

export const getEvents = async (case_id: string) => {
    return await supabase
        .from("case_events")
        .select("*")
        .eq("case_id", case_id)
        .order("event_date", { ascending: true });
};

export const getUpcomingEvents = async () => {
    const now = new Date();

    return await supabase
        .from("case_events")
        .select("*")
        .lte("event_date", new Date(now.getTime() + 2 * 86400000)); // next 2 days
};