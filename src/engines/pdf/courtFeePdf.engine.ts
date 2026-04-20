import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateCourtFeePDFBlob = ({
    state,
    type,
    amount,
    result,
}: any): Blob => {
    const doc = new jsPDF();

    doc.text("Court Fee Calculation", 10, 10);

    // (your full PDF code here...)

    return doc.output("blob");
};

const doc = new jsPDF();

// 🔷 HEADER
// src/engines/pdf/courtFeePdf.engine.ts

doc.addImage("/logo.png", "PNG", 150, 10, 40, 15);
doc.setFontSize(16);
doc.text("VK Tax & Law Chamber®", 14, 15);

doc.setFontSize(12);
doc.text("Court Fee Calculation Sheet", 14, 22);

// 🔷 DETAILS
doc.setFontSize(10);
doc.text(`State: ${state.toUpperCase()}`, 14, 30);
doc.text("Act: Court Fees Act, 1870", 14, 35);
doc.text(
    `Type: ${type === "scheduleI"
        ? "Ad Valorem (Schedule I)"
        : "Fixed Fee (Schedule II)"
    }`,
    14,
    40
);

if (type === "scheduleI") {
    doc.text(`Suit Value: ₹ ${amount}`, 14, 45);
}

// 🔷 BREAKDOWN TABLE
if (result?.breakdown) {
    const tableData = result.breakdown.map((row: any) => [
        row.range,
        `₹ ${row.amount}`,
        `${row.rate * 100}%`,
        `₹ ${row.fee}`,
    ]);

    autoTable(doc, {
        startY: 50,
        head: [["Range", "Amount", "Rate", "Fee"]],
        body: tableData,
    });
}

// 🔷 TOTAL
const finalY = (doc as any).lastAutoTable?.finalY || 60;

doc.setFontSize(12);
doc.text(
    `Total Court Fee: ₹ ${result.total || result}`,
    14,
    finalY + 10
);

// 🔷 FOOTER / LEGAL NOTE
doc.setFontSize(8);
doc.text(
    "Generated for professional assistance. Verify with applicable state amendments.",
    14,
    finalY + 20
);

doc.text("VK Tax & Law Chamber®", 14, finalY + 25);

// 🔷 SAVE
doc.save("court-fee-calculation.pdf");
};
