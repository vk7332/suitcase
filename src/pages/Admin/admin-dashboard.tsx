import UsersTable from "./users-table";
import PaymentsTable from "./payments-table";
import AnalyticsCards from "./analytics-cards";

export default function AdminDashboard() {
    return (
        <div style={{ padding: "20px" }}>

            <h1>Admin Dashboard</h1>

            <hr />

            <h2>Analytics</h2>
            <AnalyticsCards />

            <hr />

            <UsersTable />

            <hr />

            <PaymentsTable />

        </div>
    );
}
