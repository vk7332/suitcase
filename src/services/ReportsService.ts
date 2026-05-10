import { supabase } from "@/utils/supabase/supabaseClient";

export async function getDashboardStats() {
    const [clients, cases, payments] = await Promise.all([
        supabase.from("clients").select("*"),
        supabase.from("cases").select("*"),
        supabase.from("payments").select("*"),
    ]);

    const totalClients = clients.data?.length || 0;
    const totalCases = cases.data?.length || 0;

    const totalIncome =
        payments.data?.reduce(
            (sum: number, p: any) => sum + Number(p.amount),
            0
        ) || 0;

    const pendingCases =
        cases.data?.filter((c: any) => c.status !== "Completed")
            .length || 0;

    const completedCases =
        cases.data?.filter((c: any) => c.status === "Completed")
            .length || 0;

    return {
        totalClients,
        totalCases,
        totalIncome,
        pendingCases,
        completedCases,
    };
}



