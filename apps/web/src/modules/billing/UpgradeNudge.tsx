export default function UpgradeNudge({ message }: { message: string }) {
    return (
        <div style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            right: 20,
            background: '#000',
            color: '#fff',
            padding: 12,
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <span>{message}</span>

            <button
                onClick={() => window.location.href = '/pricing'}
                style={{ background: '#fff', color: '#000' }}
            >
                Upgrade
            </button>
        </div>
    );
}