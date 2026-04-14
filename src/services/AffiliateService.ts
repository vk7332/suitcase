import { supabase } from "../lib/supabaseClient";
import { generateReferralCode } from "../utils/referralUtils";

export const createAffiliate = async (userId: string, role: string) => {
    const code = generateReferralCode();

    const { data, error } = await supabase
        .from("affiliates")
        .insert([
            {
                user_id: userId,
                referral_code: code,
                role,
            },
        ])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const getAffiliate = async (userId: string) => {
    const { data, error } = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) throw error;
    return data;
};

export const getReferrals = async (userId: string) => {
    const { data, error } = await supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", userId);

    if (error) throw error;
    return data;
};

export const getCommissions = async (userId: string) => {
    const { data, error } = await supabase
        .from("commissions")
        .select("*")
        .eq("referrer_id", userId);

    if (error) throw error;
    return data;
};

export const requestPayout = async (
    userId: string,
    amount: number
) => {
    const { data, error } = await supabase
        .from("payout_requests")
        .insert([{ user_id: userId, amount }]);

    if (error) throw error;
    return data;
};
