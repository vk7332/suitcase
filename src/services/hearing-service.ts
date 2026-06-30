import { supabase } from "@/utils/supabase/supabase-client";

async function createAuditLog(
    hearingId: string,
    caseId: string,
    action: string,
    oldValue?: string,
    newValue?: string
) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

const { error } = await supabase
    .from("hearing_audit_logs")
    .insert({
        hearing_id: hearingId,
        case_id: caseId,
        action,
        old_value: oldValue || null,
        new_value: newValue || null,
        created_by: user?.id,
    });

console.log(
    "AUDIT INSERT RESULT",
    error
);

    if (error) {
        console.error(
            "AUDIT LOG ERROR",
            error
        );
    } else {
        console.log(
            "AUDIT LOG SAVED",
            action
        );
    }
}

async function syncCaseFromHearing(hearing: any) {
    if (!hearing.case_id) return;

    const outcomeText =
        (hearing.outcome || "").toLowerCase();

    const disposalRules = [
        {
            keywords: ["dismissed in default"],
            reason: "Dismissed in Default",
        },
        {
            keywords: ["dismissed"],
            reason: "Dismissed",
        },
        {
            keywords: ["withdrawn"],
            reason: "Withdrawn",
        },
        {
            keywords: ["compromise", "compromised", "settled"],
            reason: "Compromised",
        },
        {
            keywords: ["decreed", "decree"],
            reason: "Decreed",
        },
        {
            keywords: ["judgment"],
            reason: "Judgment Pronounced",
        },
        {
            keywords: ["finally decided"],
            reason: "Finally Decided",
        },
        {
            keywords: ["disposed"],
            reason: "Disposed",
        },
    ];

    let disposalReason: string | null = null;

    for (const rule of disposalRules) {
        if (
            rule.keywords.some(keyword =>
                outcomeText.includes(keyword)
            )
        ) {
            disposalReason = rule.reason;
            break;
        }
    }

    const isDisposed = disposalReason !== null;

    const updates: any = {
        case_stage: hearing.stage,
        updated_at: new Date().toISOString(),
    };

    if (isDisposed) {

        updates.status = "disposed";

        // Use the hearing date, not today's date
        updates.disposed_date = hearing.hearing_date;

        updates.disposal_reason = disposalReason;

        updates.next_hearing_date = null;

    } else {

        updates.status = "active";
        updates.disposed_date = null;
        updates.disposal_reason = null;

        updates.next_hearing_date =
            hearing.next_date ||
            hearing.hearing_date;
    }

    await supabase
        .from("cases")
        .update(updates)
        .eq("id", hearing.case_id);

    if (isDisposed) {
        await createAuditLog(
            hearing.id,
            hearing.case_id,
            "CASE_DISPOSED"
        );
    }
}

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

    const {
        data: hearing,
        error,
    } = await supabase
        .from("hearings")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    await syncCaseFromHearing(hearing);

    await createAuditLog(
        hearing.id,
        hearing.case_id,
        "HEARING_CREATED"
    );

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

export async function updateHearing(
    id: string,
    data: any
): Promise<any> {

    const {
        data: existing,
    } = await supabase
        .from("hearings")
        .select("*")
        .eq("id", id)
        .single();

    const {
        data: hearing,
        error,
    } = await supabase
        .from("hearings")
        .update(data)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    await syncCaseFromHearing(hearing);

    if (
        existing?.status !== hearing.status
    ) {
        await createAuditLog(
            hearing.id,
            hearing.case_id,
            "STATUS_CHANGED",
            existing?.status,
            hearing.status
        );
    }

    if (
        existing?.outcome !== hearing.outcome
    ) {
        await createAuditLog(
            hearing.id,
            hearing.case_id,
            "OUTCOME_UPDATED",
            existing?.outcome,
            hearing.outcome
        );
    }

    if (
        existing?.next_date !== hearing.next_date
    ) {
        await createAuditLog(
            hearing.id,
            hearing.case_id,
            "NEXT_DATE_CHANGED",
            existing?.next_date,
            hearing.next_date
        );
    }

    return hearing;
}

export async function deleteHearing(id: string) {
    const { error } = await supabase
        .from("hearings")
        .delete()
        .eq("id", id);

    if (error) throw error;
}