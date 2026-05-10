import { supabase } from "@/utils/supabase/supabaseClient";

export const getDailyUsage = async (
    userId: string,
    feature: string
): Promise<number> => {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("usage_logs")
        .select("count")
        .eq("user_id", userId)
        .eq("feature", feature)
        .eq("usage_date", today);

    if (error || !data) return 0;

    return data.reduce((sum: number, row: any) => sum + row.count, 0);
};

export const incrementUsage = async (
    userId: string,
    feature: string
) => {
    await supabase.from("usage_logs").insert([
        {
            user_id: userId,
            feature,
            usage_date: new Date().toISOString().split("T")[0],
            count: 1,
        },
    ]);
};



