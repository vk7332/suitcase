import { supabase } from "@/utils/supabase/supabase-client";

export async function getHearingAnalytics(
    caseId: string
) {
    const { data, error } = await supabase
        .from("hearings")
        .select("*")
        .eq("case_id", caseId);

    if (error) {
        throw error;
    }

    const hearings = data || [];

    const totalHearings =
        hearings.length;

    const adjournedHearings =
        hearings.filter(
            (h) => h.status === "adjourned"
        ).length;

    const completedHearings =
        hearings.filter(
            (h) => h.status === "completed"
        ).length;

    const disposedHearings =
        hearings.filter(
            (h) => h.status === "disposed"
        ).length;

    const latestHearing =
        hearings.sort(
            (a, b) =>
                new Date(
                    b.hearing_date
                ).getTime() -
                new Date(
                    a.hearing_date
                ).getTime()
        )[0];

    return {
        totalHearings,
        adjournedHearings,
        completedHearings,
        disposedHearings,
        latestHearing,
    };
}