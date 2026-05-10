import { supabase } from "@/utils/supabase/supabaseClient";

export const addCommission = async (userId: string) => {
    const { data } = await supabase
        .from("referrals")
        .select("referrer_id")
        .eq("user_id", userId)
        .single();

    if (!data?.referrer_id) return;

    await supabase.from("earnings").insert({
        user_id: data.referrer_id,
        amount: 100,
    });
};
