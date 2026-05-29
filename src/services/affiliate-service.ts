import { supabase } from "@/utils/supabase/supabase-client";

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

export const requestPayout = async (affiliateId: string, amount: number) => {
    if (!affiliateId) {
        throw new Error("Affiliate account is required");
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Enter a valid payout amount");
    }

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) throw authError;
    if (!authData.user) throw new Error("You must be signed in to request a payout");

    const { data: affiliate, error: affiliateError } = await supabase
        .from("affiliates")
        .select("id, user_id")
        .eq("id", affiliateId)
        .eq("user_id", authData.user.id)
        .single();

    if (affiliateError) throw affiliateError;
    if (!affiliate) throw new Error("Affiliate account not found");

    const { data, error } = await supabase
        .from("payout_requests")
        .insert({
            user_id: authData.user.id,
            amount,
            status: "pending",
        })
        .select()
        .single();

    if (error) throw error;

    return data;
};
