import { useEffect, useState } from "react";
import { getCaseDocuments } from "@/engines/case/case-document-engine.ts";
import CaseDocumentItem from "./CaseDocumentItem";

export default function CaseDocumentsList({ caseId }: any) {
    const [docs, setDocs] = useState<any[]>([]);

    useEffect(() => {
        const fetchDocs = async () => {
            const data = await getCaseDocuments(caseId);
            setDocs(data || []);
        };

        fetchDocs();
    }, [caseId]);

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Case Documents</h2>

            {docs.length === 0 && <p>No documents found</p>}

            <div className="space-y-2">
                {docs.map((doc) => (
                    <CaseDocumentItem key={doc.id} doc={doc} />
                ))}
            </div>
        </div>
    );
}
