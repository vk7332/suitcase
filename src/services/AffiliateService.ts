import { supabase } from "@/utils/supabase/supabaseClient";

export const handleReferral = async (userId: string) => {
    const { data } = await supabase
        .from("referrals")
        .select("referrer_id")
        .eq("user_id", userId)
        .single();

    return data?.referrer_id || null;
};

export const addCommission = async (userId: string) => {
    const referrerId = await handleReferral(userId);

    if (!referrerId) return;

    await supabase.from("earnings").insert({
        user_id: referrerId,
        amount: 100, // configurable later
    });
};
