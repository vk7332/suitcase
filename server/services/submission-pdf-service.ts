import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateSubmissionPDF = async (
    content: string,
    caseTitle: string,
    advocateName: string
) => {
    const fileName = `submission_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, "../../temp", fileName);

    const doc = new PDFDocument({
        margin: 50,
    });

    doc.pipe(fs.createWriteStream(filePath));

    // 🧾 HEADER
    doc
        .fontSize(14)
        .text("IN THE HON’BLE COURT", { align: "center" });

    doc.moveDown();

    doc
        .fontSize(12)
        .text(`Case: ${caseTitle}`, { align: "center" });

    doc.moveDown(2);

    // 🧠 TITLE
    doc
        .fontSize(13)
        .text("WRITTEN SUBMISSIONS", {
            align: "center",
            underline: true,
        });

    doc.moveDown(2);

    // 📄 BODY CONTENT
    doc
        .fontSize(11)
        .text(content, {
            align: "justify",
            lineGap: 4,
        });

    doc.moveDown(3);

    // ✍️ SIGNATURE
    doc.text(`Filed by: ${advocateName}`, {
        align: "right",
    });

    doc.text("Advocate", { align: "right" });

    doc.end();

    return {
        filePath,
        fileName,
    };
};