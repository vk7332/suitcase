import PDFDocument from "pdfkit";
import { generate65BCertificate } from "./affidavit-service.js";
import QRCode from "qrcode";

export const generateCourtBundle = async ({
    document,
    signers = [],
    annexures = [],
    final_hash,
    txHash,
    verificationUrl,
}: any) => {
    const doc = new PDFDocument({ autoFirstPage: false });
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));

    return new Promise<Buffer>(async (resolve, reject) => {
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.on("error", reject);

        try {
            doc.addPage();
            doc.font("Times-Roman");
            doc.fontSize(18).text("COURT FILING BUNDLE", { align: "center" });
            doc.moveDown(2);
            doc.fontSize(12).text(`Case: ${document?.case_title || "Untitled Case"}`);
            doc.text(`Document ID: ${document?.id || "N/A"}`);
            doc.text(`Date: ${new Date().toLocaleDateString()}`);
            doc.moveDown();
            doc.text(`Final Hash: ${final_hash || "N/A"}`);
            if (txHash) {
                doc.text(`Transaction Hash: ${txHash}`);
            }

            doc.addPage();
            doc.fontSize(16).text("INDEX", { align: "center" });
            doc.moveDown();
            doc.text("1. Main Document");
            annexures.forEach((annexure: any, index: number) => {
                doc.text(
                    `${index + 2}. ${annexure.label || `Annexure ${index + 1}`} (${annexure.title || "Attachment"})`
                );
            });
            doc.text(`${annexures.length + 2}. Section 65B Certificate`);
            doc.text(`${annexures.length + 3}. Verification Page`);

            doc.addPage();
            doc.fontSize(14).text("MAIN DOCUMENT", { align: "center" });
            doc.moveDown();
            doc.text(document?.content || "<< Document content unavailable >>");

            for (const [index, annexure] of annexures.entries()) {
                doc.addPage();
                doc.fontSize(14).text(
                    `${annexure.label || `Annexure ${index + 1}`} - ${annexure.title || "Attachment"}`,
                    { align: "center" }
                );
                doc.moveDown();
                doc.text(`Source File: ${annexure.file_url || "N/A"}`);
            }

            doc.addPage();
            doc.fontSize(14).text("SECTION 65B CERTIFICATE", { align: "center" });
            doc.moveDown();
            doc.text(`Signer: ${signers[0]?.user_name || "N/A"}`);
            doc.text(`Hash: ${final_hash || "N/A"}`);
            if (txHash) {
                doc.text(`Transaction Hash: ${txHash}`);
            }
            await generate65BCertificate({
                user_name: signers[0]?.user_name,
                certInfo: signers[0]?.certInfo || {},
                hash: final_hash,
                txHash,
            });

            doc.addPage();
            doc.fontSize(14).text("VERIFICATION", { align: "center" });
            doc.moveDown();
            doc.text(`Hash: ${final_hash || "N/A"}`);
            const qr = await QRCode.toDataURL(verificationUrl || "https://example.com/verify");
            doc.image(qr, 200, 200, { width: 150 });
            doc.text("Scan to verify document authenticity", 150, 370);

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};
