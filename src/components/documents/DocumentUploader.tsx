// src/components/documents/DocumentUploader.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

type Props = {
    caseId: string;
};

export default function DocumentUploader({ caseId }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] =
    useState("Misc.");
    const [version, setVersion] =
    useState(1);
    const [uploading, setUploading] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const [editingId, setEditingId] =
    useState<string | null>(null);
    const [editingName, setEditingName] =
    useState("");

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

    category,

    version,

    status: "uploaded",

    updated_at: new Date().toISOString(),
});

            if (dbError) {
                throw dbError;
            }

            setFile(null);

            setCategory("Misc.");

setVersion(1);

            await loadDocuments();

            alert("Document uploaded successfully");
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

const handleDelete = async (doc: any) => {

    const confirmed = window.confirm(
        `Delete "${doc.file_name}" permanently?`
    );

    if (!confirmed) return;

    try {

        // Delete from Storage
        const { error: storageError } =
            await supabase.storage
                .from(doc.bucket)
                .remove([doc.file_path]);

        if (storageError) {
            console.error(storageError);
        }

        // Delete metadata
        const { error: dbError } =
            await supabase
                .from("documents")
                .delete()
                .eq("id", doc.id);

        if (dbError) throw dbError;

        // Refresh list
        await loadDocuments();

        alert("Document deleted successfully.");

    } catch (err) {

        console.error(err);

        alert("Unable to delete document.");

    }

};

const handleRename = async (doc: any) => {
    const newName = editingName.trim();

    if (!newName) {
        alert("Document name cannot be empty.");
        return;
    }

    const { error } = await supabase
        .from("documents")
        .update({
            file_name: newName,
            updated_at: new Date().toISOString(),
        })
        .eq("id", doc.id);

    if (error) {
        console.error(error);
        alert("Unable to rename document.");
        return;
    }

    setEditingId(null);
    setEditingName("");

    await loadDocuments();
};

const getFileUrl = (path: string) => {
    return supabase.storage
        .from("documents")
        .getPublicUrl(path)
        .data.publicUrl;
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
<div className="grid md:grid-cols-2 gap-4 mt-4">

    <div>
        <label className="block text-sm font-medium mb-2">
            Document Category
        </label>

        <select
            value={category}
            onChange={(e) =>
                setCategory(e.target.value)
            }
            className="w-full border rounded-xl px-3 py-2"
        >
            <option>Plaint</option>
            <option>Written Statement</option>
            <option>Evidence</option>
            <option>Affidavit</option>
            <option>Order</option>
            <option>Judgment</option>
            <option>Misc.</option>
        </select>
    </div>

    <div>
        <label className="block text-sm font-medium mb-2">
            Version
        </label>

        <select
            value={version}
            onChange={(e) =>
                setVersion(Number(e.target.value))
            }
            className="w-full border rounded-xl px-3 py-2"
        >
            <option value={1}>v1</option>
            <option value={2}>v2</option>
            <option value={3}>v3</option>
            <option value={4}>v4</option>
            <option value={5}>v5</option>
        </select>
    </div>

</div>
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="border border-gray-200 rounded-2xl bg-white px-5 py-4 hover:shadow-md transition"
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
        className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5"
    >
        <div className="flex justify-between items-start">

            {/* LEFT */}
<div className="flex items-center gap-3">

    <div className="w-12 h-12 rounded-xl bg-blue-40 flex items-center justify-center text-xl">
        📄
    </div>

    <div>

        <div className="flex items-center gap-2">

{editingId === doc.id ? (

    <div className="flex items-center gap-2">

        <input
            value={editingName}
            onChange={(e) =>
                setEditingName(e.target.value)
            }
            className="border rounded-lg px-2 py-1 text-sm w-72"
            autoFocus
        />

        <button
            onClick={() => handleRename(doc)}
            className="text-green-600 font-bold"
            title="Save"
        >
            ✔
        </button>

        <button
            onClick={() => {
                setEditingId(null);
                setEditingName("");
            }}
            className="text-red-600 font-bold"
            title="Cancel"
        >
            ✖
        </button>

    </div>

) : (

    <div className="flex items-center gap-2">

        <h4 className="font-semibold text-gray-900 text-lg">
            {doc.file_name}
        </h4>

        <button
            onClick={() => {
                setEditingId(doc.id);
                setEditingName(doc.file_name);
            }}
            className="text-blue-600 hover:text-blue-800"
            title="Rename"
        >
            ✏
        </button>

    </div>

)}

            {/* Later we add inline rename */}

        </div>

    </div>

</div>

 {/* Category */}

<div className="flex items-center gap-2">

<span className="text-gray-400">

📂

</span>

<span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-500 font-medium">

{doc.category}

</span>

</div>

<div className="flex items-center gap-2">

     {/* Version */}

<span>

🏷

</span>

<span className="px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">

v{doc.version}

</span>

</div>

<div className="flex items-center gap-2">

         {/* Upload Date */}

📅

<span className="text-gray-400">

{new Date(doc.created_at).toLocaleDateString()}

</span>

</div>

     {/* Uploaded By */}

<div className="flex items-center gap-1.5">

👤

<span>

Current User

</span>

</div>

            {/* RIGHT */}

            <div className="flex gap-2">

                <a
                    href={getFileUrl(doc.file_path)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 rounded-.5g bg-slate-700 text-white text-sm font-medium hover:bg-slate-600"
                >
                    👁 Open
                </a>

                <a
                    href={getFileUrl(doc.file_path)}
                    download={doc.file_name}
                    className="px-2 py-1 rounded-lg bg-blue-400 text-white text-sm font-medium hover:bg-blue-600"
                >
                    ⬇ Download
                </a>

                <button
                    onClick={() => handleDelete(doc)}
                    className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100"
                >
                    🗑 Delete
                </button>

            </div>

        </div>
    </div>
))}

            </div>
        </div>
    );
}
