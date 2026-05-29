import { getSignedDocumentUrl } from "@/engines/case/case-document-engine.ts";

export default function ClientDocumentList({ docs }: any) {
    const openDoc = async (fileName: string) => {
        const url = await getSignedDocumentUrl(fileName);
        window.open(url, "_blank");
    };

    return (
        <div className="space-y-2 mt-4">
            {docs.map((doc: any) => (
                <div key={doc.id} className="border p-2 flex justify-between">
                    <span>{doc.document_type}</span>

                    <button onClick={() => openDoc(doc.file_name)}>
                        View
                    </button>
                </div>
            ))}
        </div>
    );
}
