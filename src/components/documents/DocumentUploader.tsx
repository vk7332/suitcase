// src/components/documents/DocumentUploader.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

type Props = {
    caseId: string;
};

export default function DocumentUploader({ caseId }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        loadDocuments();
    }, [caseId]);

    const loadDocuments = async () => {
        const { data, error } = await supabase
            .from("documents")
            .select("*")
            .eq("case_id", caseId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            return;
        }

        setDocuments(data || []);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file");
            return;
        }

        try {
            setUploading(true);

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                throw new Error("User not authenticated");
            }

            const fileExt = file.name.split(".").pop();

            const filePath = `${user.id}/${caseId}/${Date.now()}.${fileExt}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("documents")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Public URL
            const { data: publicUrlData } = supabase.storage
                .from("documents")
                .getPublicUrl(filePath);

            // Save metadata
            const { error: dbError } = await supabase
                .from("documents")
                .insert({
                    user_id: user.id,
                    case_id: caseId,
                    bucket: "documents",
                    file_path: filePath,
                    file_name: file.name,
                    file_type: file.type,
                    file_size: file.size,
                    status: "uploaded",
                });

            if (dbError) {
                throw dbError;
            }

            setFile(null);

            await loadDocuments();

            alert("Document uploaded successfully");
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const getFileUrl = (path: string) => {
        const { data } = supabase.storage
            .from("documents")
            .getPublicUrl(path);

        return data.publicUrl;
    };

    const formatSize = (bytes: number) => {
        if (!bytes) return "0 B";

        const kb = bytes / 1024;

        if (kb < 1024) {
            return `${kb.toFixed(1)} KB`;
        }

        return `${(kb / 1024).toFixed(2)} MB`;
    };

    return (
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 mt-6">

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Case Documents
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Upload pleadings, evidence, orders, and legal drafts.
                    </p>
                </div>
            </div>

            {/* Upload Section */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gray-50">

                <input
                    type="file"
                    onChange={(e) =>
                        setFile(e.target.files?.[0] || null)
                    }
                    className="mb-4 block w-full text-sm text-gray-700"
                />

                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="bg-[#089CCE] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#078bb8] transition disabled:opacity-50"
                >
                    {uploading ? "Uploading..." : "Upload Document"}
                </button>
            </div>

            {/* Document List */}
            <div className="mt-8 space-y-4">

                {documents.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No documents uploaded yet.
                    </div>
                )}

                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className="border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-sm transition"
                    >
                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                                📄
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    {doc.file_name}
                                </h4>

                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                    <span>
                                        {doc.file_type || "Unknown"}
                                    </span>

                                    <span>
                                        {formatSize(doc.file_size)}
                                    </span>

                                    <span>
                                        {new Date(
                                            doc.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <a
                            href={getFileUrl(doc.file_path)}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                        >
                            Open
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
