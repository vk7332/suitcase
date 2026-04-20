import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SharedDocumentPage() {
    const { token } = useParams();
    const [url, setUrl] = useState("");

    useEffect(() => {
        const fetchDoc = async () => {
            const res = await fetch(`/api/share/${token}`);
            const data = await res.json();

            setUrl(data.url);
        };

        fetchDoc();
    }, [token]);

    if (!url) return <p>Loading...</p>;

    return (
        <iframe
            src={url}
            className="w-full h-screen"
            title="Shared Document"
        />
    );
}