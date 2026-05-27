import UsersTable from "./UsersTable";
import PaymentsTable from "./PaymentsTable";
import AnalyticsCards from "./AnalyticsCards";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-1 text-gray-500">Review users, payments, analytics, and platform operations.</p>
                </div>

                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold text-gray-900">Analytics</h2>
                    <AnalyticsCards />
                </section>

                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <UsersTable />
                </section>

                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <PaymentsTable />
                </section>
            </div>
        </DashboardLayout>
    );
}
