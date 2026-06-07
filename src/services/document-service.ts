import { supabase } from "@/utils/supabase/supabase-client";

export async function uploadCaseDocument(
    caseId: string,
    file: File
) {
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    const fileExt = file.name.split(".").pop();

    const fileName = `${Date.now()}.${fileExt}`;

    const filePath = `${user.id}/${caseId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("case-documents")
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage
        .from("case-documents")
        .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

const { data: docData, error } = await supabase
    .from("documents")
    .insert({
        case_id: caseId,
        user_id: user.id,
        bucket: "case-documents",
        file_path: filePath,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        status: "active"
    })
    .select()
    .single();
    
    if (error) {
        throw error;
    }

    return docData;
}

export async function getCaseDocuments(caseId: string) {
    const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("case_id", caseId)
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    return data;
}

export async function deleteDocument(id: string) {
    const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }
}