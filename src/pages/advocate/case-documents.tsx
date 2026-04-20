import { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";

export default function CaseDocuments() {
    const [file, setFile] = useState<any>(null);

    const uploadFile = async () => {
        if (!file) return;

        const fileName = `${Date.now()}_${file.name}`;

        // 📤 Upload to storage
        const { error } = await supabase.storage
            .from("documents")
            .upload(fileName, file);

        if (error) {
            alert("Upload failed");
            return;
        }

        // 🔗 Get public URL
        const { data } = supabase.storage
            .from("documents")
            .getPublicUrl(fileName);

        // 💾 Save in DB
        await supabase.from("case_documents").insert({
            case_id: null,
            file_url: data.publicUrl,
        });

        alert("Uploaded");
    };

    return (
        <div>
            <h2>Upload Case Document</h2>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0])}
            />

            <button onClick={uploadFile}>Upload PDF</button>
        </div>
    );
}