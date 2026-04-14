import { supabase } from "../lib/supabaseClient";

export async function getFullBackup() {
    const [clients, cases, payments, diary] = await Promise.all([
        supabase.from("clients").select("*"),
        supabase.from("cases").select("*"),
        supabase.from("payments").select("*"),
        supabase.from("case_diary").select("*"),
    ]);

    return {
        clients: clients.data,
        cases: cases.data,
        payments: payments.data,
        diary: diary.data,
    };
}
