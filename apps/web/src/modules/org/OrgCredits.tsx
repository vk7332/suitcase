import { useEffect, useState } from 'react';

export default function OrgCredits() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        fetch('/api/org/credits')
            .then(res => res.json())
            .then(d => setBalance(d.balance));
    }, []);

    return (
        <div>
            💰 Firm Credits: {balance}
        </div>
    );
}