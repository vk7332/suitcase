export default function EnterpriseNudge() {
    return (
        <div style={{
            position: 'fixed',
            bottom: 20,
            background: '#111',
            color: '#fff',
            padding: 12,
            width: '100%'
        }}>
            🚀 High usage detected — Get enterprise plan for better pricing

            <button
                onClick={() => window.location.href = '/contact-sales'}
                style={{ marginLeft: 10 }}
            >
                Contact Sales
            </button>
        </div>
    );
}