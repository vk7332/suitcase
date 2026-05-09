import PDFDocument from "pdfkit";
import { generate65BCertificate } from "./affidavit.service";
import QRCode from "qrcode";

export const generateCourtBundle = async ({
    document,
    signers,
    annexures,
    final_hash,
    txHash,
    verificationUrl,
}: any) => {

    const buffers: Buffer[] = [];
    doc.on("data", buffers.push.bind(buffers));

    const paragraphs = [
        "That the present suit is filed by the Plaintiff...",
        "That the Defendant entered into an agreement...",
        "That the cause of action arose on...",
        "That the Plaintiff is entitled to relief...",
    ];

    drawCauseTitle(doc, cause, partyData);
    upper.includes("IN THE HON'BLE COURT")
    upper.includes("BEFORE THE")
    const parties = [
        'Plaintiff No.1',
        'Defendant No.2'
    ];

    drawNumberedParagraphs(doc, paragraphs);

    const doc = new PDFDocument({ autoFirstPage: false });

    doc.font("Times-Roman");

    doc.text(`${index + 1}. ${para}`, {
        align: "justify",
        indent: 25,
        lineGap: 4,
    });

    return new Promise<Buffer>(async (resolve) => {
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.switchToPage(indexPageNumber - 1);

        // -----------------------------
        // 1. COVER PAGE
        // -----------------------------
        doc.addPage(); // Cover

        doc.addPage(); // INDEX (empty for now)

        const indexPageNumber = doc.page.pageNumber;

        const pageMap: any = {};

        doc.fontSize(18).text("COURT FILING BUNDLE", {
            align: "center",
        });

        doc.moveDown(2);

        doc.fontSize(12).text(`Case: ${document.case_title}`);
        doc.text(`Document ID: ${document.id}`);
        doc.text(`Date: ${new Date().toLocaleDateString()}`);

        doc.moveDown();

        doc.text(`Final Hash: ${final_hash}`);

        // -----------------------------
        // 2. INDEX PAGE
        // -----------------------------
        doc.addPage();

        doc.fontSize(16).text("INDEX", { align: "center" });

        doc.moveDown();

        // ✅ ADD HERE
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown();

        let pageNo = 3;

        doc.text(`1. Main Document .......... Page ${pageNo}`);
        pageNo += 1;

        annexures.forEach((a: any, i: number) => {
            doc.text(
                `${i + 2}. ${a.label} (${a.title}) .......... Page ${pageNo}`
            );
            pageNo += 1;
        });

        doc.text(
            `${annexures.length + 2}. Section 65B Certificate .......... Page ${pageNo}`
        );

        // -----------------------------
        // 3. MAIN DOCUMENT
        // -----------------------------
        doc.addPage();
        pageMap["main"] = doc.page.pageNumber;

        doc.addPage();
        doc.text("MAIN DOCUMENT...");

        doc.addPage();

        doc.fontSize(14).text("MAIN DOCUMENT", { align: "center" });

        doc.moveDown();

        // ✅ ADD HERE
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown();

        doc.text("<< Your actual document content here >>");

        // -----------------------------
        // 4. ANNEXURES
        // -----------------------------
        for (const a of annexures) {
            doc.addPage();

            doc.fontSize(14).text(`${a.label} — ${a.title}`, {
                align: "center",
            });

            doc.moveDown();

            // ✅ ADD HERE
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

            doc.moveDown();

            doc.text(`Source File: ${a.file_url}`);
        }

        annexures.forEach((a, i) => {
            doc.text(
                `${i + 2}. ${a.label} (${a.title}) .......... Page ${pageMap[`annexure_${i}`]}`
            );
        });


        // -----------------------------
        // 5. 65B CERTIFICATE
        // -----------------------------
        const certBuffer = await generate65BCertificate({
            user_name: signers[0]?.user_name,
            certInfo: signers[0]?.certInfo || {},
            hash: final_hash,
            txHash,
        });

        doc.addPage();
        pageMap["65b"] = doc.page.pageNumber;

        doc.text("65B CERTIFICATE...");
        doc.fontSize(14).text(`${a.label} — ${a.title}`, {
            align: "center",
        });

        doc.moveDown();

        // ✅ ADD HERE
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown();

        doc.addPage();
        doc.text("SECTION 65B CERTIFICATE ATTACHED BELOW");

        doc.addPage();
        doc.image(certBuffer, 0, 0);

        doc.text(
            `${annexures.length + 2}. Section 65B Certificate .......... Page ${pageMap["65b"]}`
        );

        // -----------------------------
        // 6. QR VERIFICATION PAGE
        // -----------------------------
        doc.addPage();
        doc.text(
            `${annexures.length + 3}. Verification Page .......... Page ${pageMap["verify"]}`
        );

        doc.addPage();

        doc.fontSize(14).text("VERIFICATION", {
            align: "center",
        });

        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown();

        doc.text(`Hash: ${final_hash}`);

        const qr = await QRCode.toDataURL(verificationUrl);

        doc.image(qr, 200, 200, { width: 150 });

        doc.text("Scan to verify document authenticity", 150, 370);

        // -----------------------------
        // END
        // -----------------------------
        doc.end();
    });
};