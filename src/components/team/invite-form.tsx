import { useState } from "react";

export default function InviteForm() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("advocate");
    const [link, setLink] = useState("");

    const handleInvite = async () => {
        const res = await fetch("/api/invite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, role }),
        });

        const data = await res.json();

        setLink(data.link);
    };

    return (
        <div>
            <h3>Invite Member</h3>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <select onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="advocate">Advocate</option>
                <option value="staff">Staff</option>
            </select>

            <button onClick={handleInvite}>Send Invite</button>

            {link && (
                <p>
                    Invite Link: <a href={link}>{link}</a>
                </p>
            )}
        </div>
    );
}