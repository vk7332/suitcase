import React from "react";
import { AffiliateAnalytics } from "@/types/affiliateAnalytics";

interface Props {
    analytics: AffiliateAnalytics;
}

const Card = ({ title, value }: { title: string; value: number }) => (
    <div className="p-6 bg-white shadow rounded-xl border">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
);

const AnalyticsOverviewCards: React.FC<Props> = ({ analytics }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card title="Total Affiliates" value={analytics.totalAffiliates} />
            <Card title="Total Referrals" value={analytics.totalReferrals} />
            <Card title="Total Revenue (₹)" value={analytics.totalRevenue} />
            <Card title="Total Commissions (₹)" value={analytics.totalCommissions} />
        </div>
    );
};

export default AnalyticsOverviewCards;