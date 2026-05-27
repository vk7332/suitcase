import jsPDF from "jspdf";

export const generateLegalPDF = (title: string, content: string) => {
    const doc = new jsPDF();

    const marginLeft = 15;
    let y = 20;

    // Title
    doc.setFont("Times", "Bold");
    doc.setFontSize(16);
    doc.text(title, marginLeft, y);
    y += 10;

    // Body
    doc.setFont("Times", "Normal");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(content, 180);

    lines.forEach((line: string) => {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(line, marginLeft, y);
        y += 6;
    });

    // Save File
    doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
};


