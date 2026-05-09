import { useEffect, useState } from 'react';

export default function TrialBanner() {
    const [daysLeft, setDaysLeft] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/billing/trial-status')
            .then(res => res.json())
            .then(data => {
                setDaysLeft(data.daysLeft);
            });
    }, []);

    if (daysLeft === null || daysLeft > 3) return null;

    return (
        <div style={{
            background: 'orange',
            padding: 10,
            textAlign: 'center'
        }}>
            ⏳ Trial ends in {daysLeft} day(s)

            <button
                onClick={() => window.location.href = '/pricing'}
                style={{ marginLeft: 10 }}
            >
                Upgrade Now
            </button>
        </div>
    );
}