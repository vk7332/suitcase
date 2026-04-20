import { supabase } from "@/utils/supabase/supabaseclient";

// 🔹 fetch documents
export const getCaseDocuments = async (caseId: string) => {
    const { data, error } = await supabase
        .from("case_documents")
        .select("*")
        .eq("case_id", caseId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
};

// 🔹 generate fresh signed url (expiry-safe)
export const getSignedDocumentUrl = async (fileName: string) => {
    const { data, error } = await supabase.storage
        .from("case-documents")
        .createSignedUrl(fileName, 60 * 60); // 1 hour

    if (error) throw error;

    return data?.signedUrl;
};

export const saveCaseDocument = async ({
    caseId,
    fileName,
    fileUrl,
}: any) => {
    const { error } = await supabase.from("case_documents").insert([
        {
            case_id: caseId,
            file_name: fileName,
            file_url: fileUrl,
            document_type: "court_fee_calculation",
        },
    ]);

    if (error) throw error;
};