import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const addWatermark = async (pdfBytes: Buffer, text: string) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
        page.drawText(text, {
            x: 50,
            y: 50,
            size: 12,
            font,
            color: rgb(0.7, 0.7, 0.7),
            rotate: { type: "degrees", angle: 30 },
        });
    });

    return await pdfDoc.save();
};