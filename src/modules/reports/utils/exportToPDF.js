import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToPDF = (columns, rows, fileName) => {
    const doc = new jsPDF();
    doc.text(fileName, 14, 10);
    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
    });
    doc.save(`${fileName}.pdf`);
};
