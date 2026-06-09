import { supabase } from "@/utils/supabase/supabase-client";

export async function getUpcomingHearings() {
    const today = new Date();

    const next7Days = new Date();

    next7Days.setDate(today.getDate() + 7);

    const todayStr =
        today.toISOString().split("T")[0];

    const next7DaysStr =
        next7Days.toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("hearings")
        .select(`
            *,
            cases (
                id,
                case_title,
                case_number,
                court_name
            )
        `)
        .gte("hearing_date", todayStr)
        .lte("hearing_date", next7DaysStr)
        .order("hearing_date", {
            ascending: true,
        });

    if (error) throw error;

    return data || [];
}