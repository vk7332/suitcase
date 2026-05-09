import { generateHash } from "../utils/hash.util";
import { uploadDocumentVersion } from "./storage.service";
import { generatePdf } from "./pdf.service";

export const signDocumentService = async ({
    document_id,
    user_id,
    signature,
    certificate,
    otp,
}: any) => {

    const { data: doc } = await supabaseAdmin
        .from("documents")
        .select("locked")
        .eq("id", document_id)
        .single();

    if (doc?.locked) {
        throw new Error("Document is locked. No further signing allowed.");
    }

    const colorMap: any = {
        draft: "gray",
        signing: "orange",
        completed: "green",
    };

    doc.fillColor(colorMap[status], 0.2);

    // existing OTP + auth checks...

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
        JSON.stringify({
            document_id,
            user_id,
            signature,
            previousHash,
            timestamp: Date.now(),
        })
    );

    // check remaining signers
    const { data: remaining } = await supabaseAdmin
        .from("document_signers")
        .select("*")
        .eq("document_id", document_id)
        .eq("status", "pending");

    if (!remaining.length) {
        // 🎯 FINAL STEP

        // 1. Get all signers
        const { data: signers } = await supabaseAdmin
            .from("document_signers")
            .select("*")
            .eq("document_id", document_id)
            .order("signing_order", { ascending: true });

        if (document.status === "completed") {
            doc.moveDown();

            doc.fillColor("red").fontSize(12).text(
                "🔒 FINAL DOCUMENT — LOCKED & IMMUTABLE",
                { align: "center" }
            );

            doc.fillColor("black");

            doc.text(`Final Hash (SHA256): ${document.final_hash}`);
        }

        // 2. Generate FINAL PDF
        const finalPdfBuffer = await generatePdf({
            signers,
            document: { status: "completed" },
        });

        // 3. Generate FINAL HASH (FREEZE)
        const finalHash = generateHash(finalPdfBuffer);

        // 4. Upload FINAL version
        const finalVersion = docData.current_version + 1;

        const finalUrl = await uploadDocumentVersion({
            document_id,
            version: finalVersion,
            buffer: finalPdfBuffer,
        });

        // 5. Save version
        await supabaseAdmin.from("document_versions").insert({
            document_id,
            version: finalVersion,
            file_url: finalUrl,
            hash: finalHash,
            signed_by: user_id,
        });

        // 6. LOCK DOCUMENT 🔐
        await supabaseAdmin
            .from("documents")
            .update({
                status: "completed",
                final_hash: finalHash,
                locked: true,
                locked_at: new Date(),
                current_version: finalVersion,
            })
            .eq("id", document_id);
    }

    // after signing
    const { data: remaining } = await supabaseAdmin
        .from("document_signers")
        .select("*")
        .eq("document_id", document_id)
        .eq("status", "pending");

    let newStatus = "signing";

    if (!remaining.length) {
        newStatus = "completed";
    }

    await supabaseAdmin
        .from("documents")
        .update({ status: newStatus })
        .eq("id", document_id);

    // 2. Generate updated PDF
    const pdfBuffer = await generatePdf({ signers });

    // 3. Get current version
    const { data: docData } = await supabaseAdmin
        .from("documents")
        .select("current_version")
        .eq("id", document_id)
        .single();

    const newVersion = (docData.current_version || 0) + 1;
    if (status === "completed") {
        doc.rect(0, 0, 600, 30).fill("green");
        doc.fillColor("white").text("EXECUTED DOCUMENT", 200, 10);
    }

    // 4. Upload to Supabase
    const fileUrl = await uploadDocumentVersion({
        document_id,
        version: newVersion,
        buffer: pdfBuffer,
    });

    // 5. Save version record
    await supabaseAdmin.from("document_versions").insert({
        document_id,
        version: newVersion,
        file_url: fileUrl,
        hash: newHash,
        signed_by: user_id,
    });

    // 6. Update main document
    await supabaseAdmin
        .from("documents")
        .update({ current_version: newVersion })
        .eq("id", document_id);

    // 3. Save signer
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

    return newHash;
};