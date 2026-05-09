export default function AnalyticsFilters() {
    return (
        <div style={{
            display: 'flex',
            gap: 10
        }}>
            <select>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
            </select>

            <select>
                <option>All Firms</option>
            </select>
        </div>
    );
}