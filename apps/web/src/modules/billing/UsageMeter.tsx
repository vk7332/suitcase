import { useEffect, useState } from 'react';

export default function UsageMeter() {
    const [usage, setUsage] = useState(0);
    const [limit, setLimit] = useState(100);

    useEffect(() => {
        fetch('/api/billing/usage')
            .then(res => res.json())
            .then(data => {
                setUsage(data.used);
                setLimit(data.limit);
            });
    }, []);

    const percent = (usage / limit) * 100;

    return (
        <div style={{ padding: 10, borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: 12 }}>
                AI Usage: {usage} / {limit}
            </div>

            <div style={{
                height: 6,
                background: '#eee',
                marginTop: 5
            }}>
                <div style={{
                    width: `${percent}%`,
                    height: '100%',
                    background: percent > 80 ? 'red' : 'black'
                }} />
            </div>
        </div>
    );
}