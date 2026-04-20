import { useState, useEffect } from "react";
import {
    uploadDocument,
    getDocuments,
} from "../../services/DocumentService";

export default function DocumentUploader({ caseId }: any) {
    const [file, setFile] = useState<any>(null);
    const [docs, setDocs] = useState<any[]>([]);

    useEffect(() => {
        loadDocs();
    }, []);

    const loadDocs = async () => {
        const data = await getDocuments(caseId);
        setDocs(data || []);
    };

    const handleUpload = async () => {
        await uploadDocument(file, caseId);
        loadDocs();
    };

    return (
        <div className="border p-4">
            <h3 className="font-bold mb-2">Documents</h3>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0])}
            />

            <button
                onClick={handleUpload}
                className="bg-blue-600 text-white p-2 ml-2"
            >
                Upload
            </button>

            <ul className="mt-4">
                {docs.map((d) => (
                    <li key={d.id}>
                        <a href={d.file_url} target="_blank">
                            {d.file_name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}


