import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const DocumentHistory = ({ documentId }: any) => {
    const [versions, setVersions] = useState<any[]>([]);

    useEffect(() => {
        api.get(`/documents/${documentId}/versions`)
            .then(res => setVersions(res.data));
    }, []);

    return (
        <div>
            <h3>Document Versions</h3>

            {versions.map(v => (
                <div key={v.id}>
                    <p>Version: {v.version}</p>
                    <a href={v.file_url} target="_blank">
                        View PDF
                    </a>
                </div>
            ))
            }
        </div >
    );
};

export default DocumentHistory;
