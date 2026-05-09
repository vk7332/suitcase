import { useEffect, useState } from 'react';

export function useLiveCredits() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = () => {
            fetch('/api/credits/balance')
                .then(res => res.json())
                .then(d => setBalance(d.balance));
        };

        fetchBalance();

        const interval = setInterval(fetchBalance, 3000);

        return () => clearInterval(interval);
    }, []);

    return balance;
}