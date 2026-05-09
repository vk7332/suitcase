import { useEffect, useState } from 'react';

export default function MembersList() {
    const [members, setMembers] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/org/members')
            .then(res => res.json())
            .then(setMembers);
    }, []);

    return (
        <div>
            <h3>👥 Members</h3>

            {members.map(m => (
                <div key={m.user_id}>
                    {m.email} — {m.role}
                </div>
            ))}
        </div>
    );
}