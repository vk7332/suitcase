import jsPDF from "jspdf";

export function generateInvoice(data: any) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("VK Tax & Law Chamber®", 20, 20);

    doc.setFontSize(12);
    doc.text("Professional Fee Bill", 20, 30);

    doc.text(`Client: ${data.client}`, 20, 50);
    doc.text(`Case: ${data.caseTitle}`, 20, 60);
    doc.text(`Court Fee: ₹ ${data.courtFee}`, 20, 80);
    doc.text(`Advocate Fee: ₹ ${data.advocateFee}`, 20, 90);
    doc.text(`Expenses: ₹ ${data.expenses}`, 20, 100);
    doc.text(`Total: ₹ ${data.total}`, 20, 120);

    doc.text("Signature", 150, 160);

    doc.save("FeeBill.pdf");
}


