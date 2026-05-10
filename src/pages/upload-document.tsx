import { useState } from "react";

export default function UploadDocument() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/document/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.error) {
            setMessage(data.error);
        } else {
            setMessage("Uploaded successfully");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Upload Document</h2>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button onClick={handleUpload}>Upload</button>

            <p>{message}</p>
        </div>
    );
}
