import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

interface Annexure {
    title: string;
    content: string;
}

export const generateFilingBundle = async ({
    caseTitle,
    advocateName,
    mainContent,
    annexures,
}: {
    caseTitle: string;
    advocateName: string;
    mainContent: string;
    annexures: Annexure[];
}) => {
    const fileName = `bundle_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, "../../temp", fileName);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(filePath));

    let pageIndex: any[] = [];
    let currentPage = 1;

    // 📄 INDEX PAGE
    doc.fontSize(16).text("INDEX", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);

    // Placeholder (we'll fill manually)
    doc.text("1. Written Submissions .......... 2");
    annexures.forEach((a, i) => {
        doc.text(`${i + 2}. ${a.title} .......... ${i + 3}`);
    });

    doc.addPage();
    currentPage++;

    // 🧾 MAIN SUBMISSION
    doc.fontSize(14).text("WRITTEN SUBMISSIONS", {
        align: "center",
    });
    doc.moveDown();

    doc.fontSize(11).text(mainContent, {
        align: "justify",
    });

    doc.addPage();
    currentPage++;

    // 📎 ANNEXURES
    annexures.forEach((a, i) => {
        doc.fontSize(13).text(`ANNEXURE ${i + 1}`, {
            underline: true,
        });

        doc.moveDown();
        doc.text(a.title);
        doc.moveDown();

        doc.fontSize(11).text(a.content);

        doc.addPage();
        currentPage++;
    });

    // ✍️ SIGNATURE
    doc.moveDown(2);
    doc.text(`Filed by: ${advocateName}`, {
        align: "right",
    });

    doc.end();

    return { filePath, fileName };
};