import { supabase } from "@/utils/supabase/supabase-client";

export async function uploadDocument(
    file: File,
    caseId: string
) {
    try {
        const filePath = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
            .from("documents")
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from("documents")
            .getPublicUrl(filePath);

        const publicUrl = data.publicUrl;

        const { error: dbError } = await supabase
            .from("documents")
            .insert([
                {
                    case_id: caseId,
                    user_id: (
                        await supabase.auth.getUser()
                    ).data.user?.id,
                    file_name: file.name,
                    file_path: publicUrl,
                    bucket: "documents",
                    file_type: file.type,
                    file_size: file.size,
                    status: "uploaded",
                },
            ]);

        if (dbError) {
            throw dbError;
        }

        return publicUrl;
    } catch (error) {
        console.error(error);
        alert("Document upload failed");
    }
}

export async function getDocuments(caseId: string) {
    const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("case_id", caseId)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}