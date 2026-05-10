import { useAffiliateAnalytics } from "@/hooks/useAffiliateAnalytics";
import AnalyticsOverviewCards from "@/components/affiliate/AnalyticsOverviewCards";
import ReferralTrendChart from "@/components/affiliate/ReferralTrendChart";
import TopAffiliatesTable from "@/components/affiliate/TopAffiliatesTable";

const AffiliateAnalytics = () => {
    const { analytics, trends, topAffiliates, loading } =
        useAffiliateAnalytics();

    if (loading) return <p className="p-6">Loading analytics...</p>;
    if (!analytics) return <p className="p-6">No data available.</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">
                Affiliate Analytics Dashboard
            </h1>

            <AnalyticsOverviewCards analytics={analytics} />
            <ReferralTrendChart data={trends} />
            <TopAffiliatesTable affiliates={topAffiliates} />
        </div>
    );
};

export default AffiliateAnalytics;


