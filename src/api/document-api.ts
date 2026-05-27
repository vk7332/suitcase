import { api } from "../lib/api";

export const uploadDocument = async (file: File, caseId: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("case_id", caseId);

    const res = await api.post("/documents/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const getDocumentUrl = async (id: string) => {
    const res = await api.get(`/documents/${id}/url`);
    return res.data;
};
