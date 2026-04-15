import { supabase } from "@/utils/supabase/supabaseClient";
import {
    AffiliateAnalytics,
    ReferralTrend,
    TopAffiliate,
} from "@/types/affiliateAnalytics";

export const getAffiliateAnalytics = async (): Promise<AffiliateAnalytics> => {
    const { count: totalAffiliates } = await supabase
        .from("affiliates")
        .select("*", { count: "exact", head: true });

    const { count: totalReferrals } = await supabase
        .from("referrals")
        .select("*", { count: "exact", head: true });

    const { data: earningsData } = await supabase
        .from("affiliates")
        .select("total_earnings");

    const totalRevenue =
        earningsData?.reduce((sum, item) => sum + Number(item.total_earnings), 0) ||
        0;

    return {
        totalAffiliates: totalAffiliates || 0,
        totalReferrals: totalReferrals || 0,
        totalRevenue,
        totalCommissions: totalRevenue,
    };
};

export const getReferralTrends = async (): Promise<ReferralTrend[]> => {
    const { data, error } = await supabase
        .from("referrals")
        .select("created_at");

    if (error || !data) return [];

    const trendMap: Record<string, number> = {};

    data.forEach((ref) => {
        const date = new Date(ref.created_at).toLocaleDateString();
        trendMap[date] = (trendMap[date] || 0) + 1;
    });

    return Object.entries(trendMap).map(([date, count]) => ({
        date,
        count,
    }));
};

export const getTopAffiliates = async (): Promise<TopAffiliate[]> => {
    const { data, error } = await supabase
        .from("affiliates")
        .select(
            "id, referral_code, total_referrals, total_earnings"
        )
        .order("total_earnings", { ascending: false })
        .limit(5);

    if (error || !data) return [];
    return data;
};