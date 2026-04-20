import { useEffect, useState } from "react";
import RevenueCard from "../../components/admin/RevenueCard";
import RevenueChart from "../../components/admin/RevenueChart";
import RecentTransactions from "../../components/admin/RecentTransactions";
import { getAdminDashboardData } from "../../services/AdminService";

export default function AdminRevenueDashboard() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAdminDashboardData();
            setData(result);
        };
        fetchData();
    }, []);

    if (!data) {
        return <div className="p-6">Loading dashboard...</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">
                📊 Admin Revenue Dashboard
            </h1>

            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RevenueCard
                    title="Total Revenue"
                    value={`₹${data.totalRevenue}`}
                />
                <RevenueCard
                    title="Active Subscriptions"
                    value={data.activeSubscriptions}
                />
                <RevenueCard
                    title="Total Transactions"
                    value={data.recentPayments.length}
                />
            </div>

            {/* Chart */}
            <RevenueChart data={data.monthlyRevenue} />

            {/* Transactions */}
            <RecentTransactions payments={data.recentPayments} />
        </div>
    );
}


