import { supabase } from "@/utils/supabase/supabase-client";

export async function uploadDocument(file: File, caseId: string) {
    const filePath = `${caseId}/${file.name}`;

    await supabase.storage
        .from("case-documents")
        .upload(filePath, file);

    const { data } = supabase.storage
        .from("case-documents")
        .getPublicUrl(filePath);

    await supabase.from("documents").insert([
        {
            case_id: caseId,
            file_name: file.name,
            file_url: data.publicUrl,
        },
    ]);
}

export async function getDocuments(caseId: string) {
    const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("case_id", caseId);

    return data;
}


