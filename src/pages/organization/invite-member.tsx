import { useState } from "react";

export default function InviteMember() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("staff");

    const invite = async () => {
        await fetch("/api/invite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, role }),
        });
    };

    return (
        <div className="p-6">
            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <select onChange={(e) => setRole(e.target.value)}>
                <option value="staff">Staff</option>
                <option value="advocate">Advocate</option>
            </select>

            <button onClick={invite}>Invite</button>
        </div>
    );
}