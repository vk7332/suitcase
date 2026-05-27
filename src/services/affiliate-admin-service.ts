import { supabase } from "@/utils/supabase/supabase-client";

export const fetchAffiliates = async () => {
    const { data, error } = await supabase
        .from("affiliates")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
};

export const fetchCommissions = async () => {
    const { data, error } = await supabase
        .from("commissions")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
};

export const fetchPayoutRequests = async () => {
    const { data, error } = await supabase
        .from("payout_requests")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
};

export const updatePayoutStatus = async (
    id: string,
    status: string
) => {
    const { error } = await supabase
        .from("payout_requests")
        .update({ status })
        .eq("id", id);

    if (error) throw error;
};

export const updateCommissionStatus = async (
    id: string,
    status: string
) => {
    const { error } = await supabase
        .from("commissions")
        .update({ status })
        .eq("id", id);

    if (error) throw error;
};



