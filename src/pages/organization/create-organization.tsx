import { useState } from "react";

export default function CreateOrganization() {
    const [name, setName] = useState("");

    const handleCreate = async () => {
        await fetch("/api/organization/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
    };

    return (
        <div className="p-6">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Organization Name"
            />

            <button onClick={handleCreate}>
                Create Organization
            </button>
        </div>
    );
}