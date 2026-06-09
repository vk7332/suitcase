import { supabase } from "@/utils/supabase/supabase-client";

export async function createHearing(data: any) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const payload = {
        ...data,
        created_by: user.id,
    };

    const { data: hearing, error } = await supabase
        .from("hearings")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    // AUTO UPDATE CASE
    if (data.case_id && data.hearing_date) {
        await supabase
            .from("cases")
            .update({
                next_hearing_date: data.hearing_date,
                updated_at: new Date().toISOString(),
            })
            .eq("id", data.case_id);
    }

    // AUTO TIMELINE ENTRY
    if (data.case_id) {
        await supabase
            .from("case_timeline")
            .insert({
                case_id: data.case_id,
                action: "hearing_added",
                description: `Hearing added for ${data.hearing_date}`,
                created_by: user.id,
            });
    }

    return hearing;
}

export async function getHearings(caseId: string) {
    const { data, error } = await supabase
        .from("hearings")
        .select("*")
        .eq("case_id", caseId)
        .order("hearing_date", {
            ascending: false,
        });

    if (error) throw error;

    return data;
}

export async function deleteHearing(id: string) {
    const { error } = await supabase
        .from("hearings")
        .delete()
        .eq("id", id);

    if (error) throw error;
}