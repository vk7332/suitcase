import { useEffect, useState } from 'react';

export default function RevenueCard() {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch('/api/analytics/revenue')
            .then(r => r.json())
            .then(d => setTotal(d[0]?.total || 0));
    }, []);

    return (
        <div style={{
            border: '1px solid #ddd',
            padding: 20
        }}>
            <h3>💰 Revenue</h3>

            <div>₹ {total}</div>
        </div>
    );
}