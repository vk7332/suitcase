import { useEffect, useState } from 'react';

export default function CreditMeter() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        fetch('/api/credits/balance')
            .then(res => res.json())
            .then(data => setBalance(data.balance));
    }, []);

    return (
        <div style={{ fontSize: 12 }}>
            AI Credits: {balance}
        </div>
    );
}