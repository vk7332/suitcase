import { supabase } from '../supabase';

export async function uploadFile({
    userId,
    caseId,
    fileBuffer,
    fileName
}) {
    const path = `${userId}/${caseId}/${fileName}`;

    const { error } = await supabase.storage
        .from('case-files')
        .upload(path, fileBuffer, {
            contentType: 'application/pdf'
        });

    if (error) throw error;

    return path;
}

export async function getFileUrl(path: string) {
    const { data, error } = await supabase.storage
        .from('case-files')
        .getPublicUrl(path);
    if (error) throw error;

    return data.publicUrl;
}

export async function deleteFile(path: string) {
    const { error } = await supabase.storage.from('case-files').remove([path]);
    if (error) throw error;
}

export async function getSignedUrl(path: string) {
    const { data } = await supabase.storage
        .from('case-files')
        .createSignedUrl(path, 60 * 5); // 5 min

    return data?.signedUrl;
}
