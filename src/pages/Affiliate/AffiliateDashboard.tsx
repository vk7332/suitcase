import ReferralLinkCard from "@/components/affiliate/ReferralLinkCard";
import EarningsCard from "@/components/affiliate/EarningsCard";
import ReferralsTable from "@/components/affiliate/ReferralsTable";
import PayoutRequestForm from "@/components/affiliate/PayoutRequestForm";
import { useAffiliate } from "@/hooks/useAffiliate";


const AffiliateDashboard = lazy(
    () => import("@/pages/Affiliate/AffiliateDashboard")
);


if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">Loading affiliate data...</p>
        </div>
    );
}

if (!affiliate) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Affiliate Program</h1>
            <p className="mt-2 text-gray-600">
                You are not enrolled in the affiliate program yet.
            </p>
        </div>
    );
}

return (
    <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReferralLinkCard affiliate={affiliate} />
            <EarningsCard affiliate={affiliate} />
        </div>

        {/* Referrals Table */}
        <ReferralsTable referrals={referrals} />

        {/* Payout Request Form */}
        <PayoutRequestForm affiliateId={affiliate.id} />
    </div>
);
};

export default AffiliateDashboard;