import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ClientDocument() {
    const { token } = useParams();

    const [doc, setDoc] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoc = async () => {
            const res = await fetch(`/api/client/document/${token}`);
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setDoc(data);
            }
        };

        fetchDoc();
    }, [token]);

    if (error) return <p>{error}</p>;
    if (!doc) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Shared Document</h2>

            <a href={doc.file_url} target="_blank">
                View / Download File
            </a>
        </div>
    );
}
