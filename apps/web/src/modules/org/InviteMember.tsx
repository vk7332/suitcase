import { useState } from 'react';

export default function InviteMember() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('member');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function invite() {
        setLoading(true);
        setSuccess(false);

        try {
            const res = await fetch('/api/org/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    role
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Invite failed');
                return;
            }

            setSuccess(true);
            setEmail('');

        } catch (err) {
            console.error(err);
            alert('Invite failed');

        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 8
        }}>
            <h3>➕ Invite Team Member</h3>

            <input
                type="email"
                placeholder="Advocate email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    width: '100%',
                    marginBottom: 10,
                    padding: 8
                }}
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                    width: '100%',
                    marginBottom: 10,
                    padding: 8
                }}
            >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
            </select>

            <button
                onClick={invite}
                disabled={loading}
                style={{
                    padding: '8px 14px'
                }}
            >
                {loading ? 'Inviting...' : 'Invite'}
            </button>

            {success && (
                <div style={{ marginTop: 10 }}>
                    ✅ Invitation successful
                </div>
            )}
        </div>
    );
}