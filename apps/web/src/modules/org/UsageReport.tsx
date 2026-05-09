import { useEffect, useState } from 'react';

export default function UsageReport() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/analytics/top-users')
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <div>
            <h3>📊 Top Usage</h3>

            {data.map((u, i) => (
                <div key={i}>
                    {u.user_id} — {u.total_tokens}
                </div>
            ))}
        </div>
    );
}