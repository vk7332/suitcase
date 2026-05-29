import { supabaseAdmin } from "../config/supabase";

export const logEvent = async ({
    type,
    data,
}: {
    type: string;
    data: any;
}) => {
    try {
        await supabaseAdmin.from("logs").insert([
            {
                type,
                data: JSON.stringify(data),
                created_at: new Date(),
            },
        ]);
    } catch (err) {
        console.error("Log failed", err);
    }
};
export const logAction = ({
    caseId,
    input,
    output,
}: {
    caseId: string;
    input: string;
    output: any;
}) => {
    console.log("LOG:", {
        caseId,
        input,
        output,
        time: new Date().toISOString(),
    });
};