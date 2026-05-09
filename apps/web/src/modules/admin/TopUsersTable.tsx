import { useEffect, useState } from 'react';

export default function TopUsersTable() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/analytics/top-users')
            .then(r => r.json())
            .then(setUsers);
    }, []);

    return (
        <div>
            <h3>🏆 Top Users</h3>

            <table width="100%">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Tokens</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u, i) => (
                        <tr key={i}>
                            <td>{u.user_id}</td>
                            <td>{u.total_tokens}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}