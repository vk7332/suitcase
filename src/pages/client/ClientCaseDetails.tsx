import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClientDocuments } from "@/engines/client/client-engine.ts";
import ClientDocumentList from "@/components/client/ClientDocumentList";

export default function ClientCaseDetails() {
    const { id } = useParams();
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const fetchDocs = async () => {
            const data = await getClientDocuments(id!);
            setDocs(data || []);
        };

        fetchDocs();
    }, [id]);

    return (
        <div className="p-6">
            <h1 className="text-lg font-bold">Case Documents</h1>

            <ClientDocumentList docs={docs} />
        </div>
    );
}
