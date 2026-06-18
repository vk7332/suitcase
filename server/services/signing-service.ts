import { generateHash } from "../utils/hash-util.js";
import { supabaseAdmin } from "../config/supabase.js";
import { uploadDocumentVersion } from "./storage-service.js";
import { generatePdf } from "./pdf-service.js";

export const signDocumentService = async ({
    document_id,
    user_id,
    signature,
    certificate,
    otp,
}: any) => {
    const { data: document } = await supabaseAdmin
        .from("documents")
        .select("id, locked, current_version, status")
        .eq("id", document_id)
        .single();

    if (document?.locked) {
        throw new Error("Document is locked. No further signing allowed.");
    }

    // 1. Fetch latest signed version
    const { data: lastSigned } = await supabaseAdmin
        .from("document_signers")
        .select("*")
        .eq("document_id", document_id)
        .eq("status", "signed")
        .order("signed_at", { ascending: false })
        .limit(1);

    const previousHash = lastSigned?.[0]?.document_hash || null;

    // 2. Create new hash (chain)
    const newHash = generateHash(
        Buffer.from(JSON.stringify({
            document_id,
            user_id,
            signature,
            previousHash,
            timestamp: Date.now(),
            otp,
        }))
    );

    // 3. Save signer state
    await supabaseAdmin
        .from("document_signers")
        .update({
            status: "signed",
            signed_at: new Date(),
            signature,
            certificate,
            document_hash: newHash,
            previous_hash: previousHash,
        })
        .eq("document_id", document_id)
        .eq("user_id", user_id);

    // 4. Load current signer state for regenerated document
    const { data: signers } = await supabaseAdmin
        .from("document_signers")
        .select("*")
        .eq("document_id", document_id)
        .order("signing_order", { ascending: true });

    // 5. Generate updated PDF
    const pdfBuffer = await generatePdf({ signers });

    // 6. Get current version
    const currentVersion = document?.current_version || 0;
    const newVersion = currentVersion + 1;

    // 7. Upload to Supabase
    const fileUrl = await uploadDocumentVersion({
        document_id,
        version: newVersion,
        buffer: pdfBuffer,
    });

    // 8. Save version record
    await supabaseAdmin.from("document_versions").insert({
        document_id,
        version: newVersion,
        file_url: fileUrl,
        hash: newHash,
        signed_by: user_id,
    });

    // 9. Determine whether signing is complete
    const { data: remainingAfterSign } = await supabaseAdmin
        .from("document_signers")
        .select("*")
        .eq("document_id", document_id)
        .eq("status", "pending");

    const isCompleted = !remainingAfterSign?.length;
    const updatePayload: Record<string, unknown> = {
        current_version: newVersion,
        status: isCompleted ? "completed" : "signing",
    };

    if (isCompleted) {
        updatePayload.final_hash = newHash;
        updatePayload.locked = true;
        updatePayload.locked_at = new Date();
    }

    // 10. Update main document
    await supabaseAdmin
        .from("documents")
        .update(updatePayload)
        .eq("id", document_id);

    return newHash;
};
