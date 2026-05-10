import { supabase } from "@/utils/supabase/supabaseClient";

export const uploadCaseDocument = async ({
    file,
    caseId,
}: {
    file: Blob;
    caseId: string;
}) => {
    const fileName = `court-fee-${Date.now()}.pdf`;

    const { data, error } = await supabase.storage
        .from("case-documents")
        .upload(fileName, file, {
            contentType: "application/pdf",
        });

    if (error) throw error;

    const { data: urlData } = await supabase.storage
        .from("case-documents")
        .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 days

    return {
        path: data.path,
        url: urlData?.signedUrl,
        fileName,
    };
};
