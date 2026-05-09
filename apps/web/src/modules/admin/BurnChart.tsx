import { useEffect, useState } from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

export default function BurnChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/analytics/burn-rate')
            .then(r => r.json())
            .then(setData);
    }, []);

    return (
        <div>
            <h3>🔥 Burn Rate</h3>

            <LineChart width={900} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />
                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="tokens"
                />
            </LineChart>
        </div>
    );
}