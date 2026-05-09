import { useEffect, useState } from 'react';

export function useUpgradeSuggestion() {
    const [suggestion, setSuggestion] = useState(null);

    useEffect(() => {
        fetch('/api/billing/upgrade-suggestion')
            .then(res => res.json())
            .then(setSuggestion);
    }, []);

    return suggestion;
}