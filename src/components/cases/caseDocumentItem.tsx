import { useState } from "react";
import { getSignedDocumentUrl } from "@/engines/case/caseDocument.engine";

export default function CaseDocumentItem({ doc }: any) {
    const [loading, setLoading] = useState(false);

    const handleOpen = async () => {
        setLoading(true);
        try {
            const url = await getSignedDocumentUrl(doc.file_name);
            window.open(url, "_blank");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        setLoading(true);
        try {
            const url = await getSignedDocumentUrl(doc.file_name);

            const a = document.createElement("a");
            a.href = url!;
            a.download = doc.file_name;
            a.click();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-3 rounded flex justify-between items-center">
            <div>
                <p className="font-medium">{doc.document_type}</p>
                <p className="text-xs text-gray-500">
                    {new Date(doc.created_at).toLocaleString()}
                </p>
            </div>

            <div className="flex gap-2">
                <button onClick={handleOpen} disabled={loading}>
                    View
                </button>

                <button onClick={handleDownload} disabled={loading}>
                    Download
                </button>
            </div>
        </div>
    );
}
