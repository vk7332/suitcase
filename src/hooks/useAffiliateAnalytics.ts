import { useEffect, useState } from "react";
import {
    getAffiliateAnalytics,
    getReferralTrends,
    getTopAffiliates,
} from "@/services/AffiliateAnalyticsService";
import {
    AffiliateAnalytics,
    ReferralTrend,
    TopAffiliate,
} from "@/types/affiliateAnalytics";

export const useAffiliateAnalytics = () => {
    const [analytics, setAnalytics] = useState<AffiliateAnalytics | null>(null);
    const [trends, setTrends] = useState<ReferralTrend[]>([]);
    const [topAffiliates, setTopAffiliates] = useState<TopAffiliate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            const analyticsData = await getAffiliateAnalytics();
            const trendsData = await getReferralTrends();
            const topAffiliatesData = await getTopAffiliates();

            setAnalytics(analyticsData);
            setTrends(trendsData);
            setTopAffiliates(topAffiliatesData);
            setLoading(false);
        };

        fetchAnalytics();
    }, []);

    return { analytics, trends, topAffiliates, loading };
};


