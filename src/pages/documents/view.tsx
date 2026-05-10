import { useParams } from "react-router-dom";
import { api } from "@/lib/api";

const DocumentViewPage = () => {
    const { id: documentId } = useParams();

    const downloadBundle = async () => {
        try {
            const res = await api.get(`/bundle/${documentId}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));

            const a = document.createElement("a");
            a.href = url;
            a.download = "court-bundle.pdf";
            a.click();
        } catch (e) {
            console.error("Failed to download bundle", e);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Document View</h1>
            <p>Document ID: {documentId}</p>
            <button
                onClick={downloadBundle}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Download Court Bundle
            </button>
        </div>
    );
};

export default DocumentViewPage;
