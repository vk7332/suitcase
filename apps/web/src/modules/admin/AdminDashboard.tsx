import RevenueCard from './RevenueCard';
import BurnChart from './BurnChart';
import MRRCard from './MRRCard';
import ChurnCard from './ChurnCard';
import LTVCard from './LTVCard';
import TopUsersTable from './TopUsersTable';
import AnalyticsFilters from './AnalyticsFilters';

export default function AdminDashboard() {
    return (
        <div style={{ padding: 20 }}>

            <h1>📊 Admin Analytics Dashboard</h1>

            <AnalyticsFilters />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                marginTop: 20
            }}>
                <RevenueCard />
                <MRRCard />
                <ChurnCard />
                <LTVCard />
            </div>

            <div style={{ marginTop: 30 }}>
                <BurnChart />
            </div>

            <div style={{ marginTop: 30 }}>
                <TopUsersTable />
            </div>

        </div>
    );
}