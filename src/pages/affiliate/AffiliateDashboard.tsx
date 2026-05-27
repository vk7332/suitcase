import ReferralLinkCard from "@/components/affiliate/ReferralLinkCard";
import EarningsCard from "@/components/affiliate/EarningsCard";
import ReferralsTable from "@/components/affiliate/ReferralsTable";
import PayoutRequestForm from "@/components/affiliate/PayoutRequestForm";
import { useAffiliate } from "@/hooks/use-affiliate";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AffiliateDashboard = () => {
    const { affiliate, referrals, loading } = useAffiliate();

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex min-h-[50vh] items-center justify-center">
                    <p className="text-lg font-medium text-gray-600">Loading affiliate data...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (!affiliate) {
        return (
            <DashboardLayout>
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900">Affiliate Dashboard</h1>
                    <p className="mt-2 text-gray-600">
                        You are not enrolled in the affiliate program yet.
                    </p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Affiliate Dashboard</h1>
                    <p className="mt-1 text-gray-500">Track referral links, earnings, conversions, and payout requests.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <ReferralLinkCard affiliate={affiliate} />
                    <EarningsCard affiliate={affiliate} />
                </div>

                <section className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Referrals</h2>
                    <ReferralsTable referrals={referrals} />
                </section>

                <section className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900">Payout Request</h2>
                    <PayoutRequestForm affiliateId={affiliate.id} />
                </section>
            </div>
        </DashboardLayout>
    );
};

export default AffiliateDashboard;
