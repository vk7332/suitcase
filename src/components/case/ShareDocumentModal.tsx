import { useState } from "react";

export default function ShareDocumentModal({ doc }: any) {
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");

    const handleShare = async () => {
        const res = await fetch("/api/share", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                documentId: doc.id,
                caseId: doc.case_id,
                email,
            }),
        });

        const data = await res.json();
        setLink(data.link);
    };

    return (
        <div className="p-4 border">
            <h3 className="font-bold">Share Document</h3>

            <input
                type="email"
                placeholder="Client Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
            />

            <button onClick={handleShare}>Generate Link</button>

            {link && (
                <div className="mt-2">
                    <p className="text-sm">Share this link:</p>
                    <input value={link} readOnly className="w-full border p-2" />
                </div>
            )}
        </div>
    );
}
