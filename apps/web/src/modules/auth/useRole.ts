import { useEffect, useState } from 'react';

export function useRole() {
    const [role, setRole] = useState('');

    useEffect(() => {
        fetch('/api/me/role')
            .then(res => res.json())
            .then(d => setRole(d.role));
    }, []);

    return role;
}