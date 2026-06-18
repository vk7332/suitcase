import { supabaseAdmin } from "../config/supabase.js";

export const uploadDocumentVersion = async ({
    document_id,
    version,
    buffer,
}: any) => {
    const path = `${document_id}/v${version}.pdf`;

    const { error } = await supabaseAdmin.storage
        .from("documents")
        .upload(path, buffer, {
            contentType: "application/pdf",
            upsert: true,
        });

    if (error) throw error;

    const { data } = supabaseAdmin.storage
        .from("documents")
        .getPublicUrl(path);

    return data.publicUrl;
};

export const getSignedDocumentUrl = async (path: string) => {
    const { data, error } = await supabaseAdmin.storage
        .from("documents")
        .createSignedUrl(path, 60 * 5); // 5 minutes

    if (error) throw error;

    return data.signedUrl;
};