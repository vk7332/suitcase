import jsPDF from "jspdf";

export function exportFeeReport(data: any) {
    const doc = new jsPDF();

    doc.text("Court Fee Calculation Report", 20, 20);

    doc.text(`Court Fee: ${data.courtFee}`, 20, 40);
    doc.text(`Filing Fee: ${data.filingFee}`, 20, 50);
    doc.text(`Process Fee: ${data.processFee}`, 20, 60);
    doc.text(`Application Fee: ${data.applicationFee}`, 20, 70);
    doc.text(`Affidavit Fee: ${data.affidavitFee}`, 20, 80);
    doc.text(`Notary Fee: ${data.notaryFee}`, 20, 90);
    doc.text(`Vakalatnama Fee: ${data.vakalatnamaFee}`, 20, 100);

    doc.text(`Total Cost: ${data.total}`, 20, 120);

    doc.save("court-feeReport.pdf");
}


