import { useEffect, useState } from 'react';

export function useRole() {
    const [role, setRole] = useState('user');

    useEffect(() => {
        fetch('/api/me/role')
            .then(r => r.json())
            .then(d => setRole(d.role || 'user'))
            .catch(() => { });
    }, []);

    return role;
}