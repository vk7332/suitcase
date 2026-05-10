import crypto, { hash } from "crypto";
import signer from "node-signpdf";
import { PDFDocument, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import { supabaseAdmin } from "../config/supabase";
import { signHash } from "../utils/signature";
import { generate65BCertificateText } from "./certificate.service";
import { saveAuditReport } from "./report.service";
import { generate65BCertificate } from "./affidavit.service";

export const generateAuditPdf = async ({
    chamber_id,
    user_name,
    generatedAt,
    hash,
    verificationId,
    logs
}: {
    chamber_id: string;
    user_name: string;
    generatedAt: string;
    hash: string;
    verificationId: string;
    logs: any[];
}) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Set the document title
    page.drawText("SUITCASE Audit Report", {
        x: 50,
        y: 750,
        size: 18,
        font,
    });

    // Set the chamber ID
    page.drawText(`Chamber ID: ${chamber_id}`, {
        x: 50,
        y: 730,
        size: 12,
        font,
    });

    // Set the user name
    page.drawText(`User Name: ${user_name}`, {
        x: 50,
        y: 710,
        size: 12,
        font,
    });

    // Set the generated at date
    page.drawText(`Generated At: ${generatedAt}`, {
        x: 50,
        y: 690,
        size: 12,
        font,
    });

    // Set the report integrity hash
    page.drawText("Report Integrity Hash (SHA256):", {
        x: 50,
        y: 670,
        size: 10,
        font,
    });
    page.drawText(hash, {
        x: 50,
        y: 655,
        size: 8,
        font,
    });

    // 5. Logs
    logs.forEach((log, index) => {
        page.drawText(`Action: ${log.action}`, {
            x: 50,
            y: 600 - index * 20,
            size: 10,
            font,
        });
        page.drawText(`User: ${log.user_id}`, {
            x: 50,
            y: 580 - index * 20,
            size: 10,
            font,
        });
        page.drawText(`Hash: ${log.hash}`, {
            x: 50,
            y: 560 - index * 20,
            size: 10,
            font,
        });
        page.drawText(`Prev: ${log.prev_hash}`, {
            x: 50,
            y: 540 - index * 20,
            size: 10,
            font,
        });
    });

    return await pdfDoc.save();
};

/* =========================================================
   📄 PAGE TRACKER
========================================================= */

class PageTracker {
    doc: any;
    pageNumber: number = 1;
    [key: string]: any;

    constructor(doc: any) {
        this.doc = doc;
    }

    next() {
        this.pageNumber++;
        this.doc.addPage();
    }
}

const addHeaderFooter = (doc, document) => {
    const page = doc.page;

    // HEADER
    doc.fontSize(9)
        .text(`Case No: ${document.case_number}`, 50, 20, {
            align: "left",
        });

    doc.text(`Advocate: ${document.advocate_name}`, 50, 20, {
        align: "right",
    });

    // FOOTER (page number)
    doc.text(
        `Page ${page.pageNumber}`,
        0,
        doc.page.height - 40,
        { align: "center" }
    );
};


interface Cause {
    court: string;
}

interface PartyData {
    plaintiff: string;
    defendant: string;
}

interface Section {
    title: string;
    content: string[];
}

interface StructuredSection {
    title: string;
    content: string[];
}

const drawCauseTitle = (doc: any, cause: Cause, partyData: PartyData): void => {
    // COURT NAME
    doc.font("Helvetica-Bold")
        .fontSize(14)
        .text(cause.court, {
            align: "center",
        });

    doc.moveDown(2);

    // PLAINTIFF
    doc.font("Helvetica")
        .fontSize(12)
        .text(`${partyData.plaintiff}`, {
            align: "left",
        });

    doc.text("... Plaintiff", { align: "right" });

    doc.moveDown();

    // VERSUS
    doc.text("VERSUS", { align: "center" });

    doc.moveDown();

    // DEFENDANT
    doc.text(`${partyData.defendant}`, {
        align: "left",
    });

    doc.text("... Defendant", { align: "right" });

    doc.moveDown(2);

    // LINE
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    doc.moveDown();
};

const drawSections = (doc: any, sections: Section[]): void => {
    sections.forEach((section, sIndex) => {
        doc.addPage();

        // 🔷 HEADING STYLE
        doc.fontSize(14)
            .font("Helvetica-Bold")
            .text(section.title, {
                align: "center",
            });

        doc.moveDown();

        // line separator
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown();

        // 🔢 NUMBERED PARAGRAPHS
        section.content.forEach((para: string, index: number) => {
            doc.moveDown(0.5);

            doc.font("Helvetica")
                .fontSize(12)
                .text(
                    `${index + 1}. ${para}`,
                    {
                        align: "justify",
                        indent: 25,
                        lineGap: 4,
                    }
                );
        });
    });
};

const drawStructuredSections = (doc: any, sections: StructuredSection[]): void => {
    sections.forEach((section) => {
        doc.addPage();

        doc.font("Helvetica-Bold")
            .fontSize(14)
            .text(section.title, { align: "center" });

        doc.moveDown();

        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown();

        section.content.forEach((para, index) => {
            doc.moveDown(0.5);

            doc.font("Helvetica")
                .fontSize(12)
                .text(`${index + 1}. ${para}`, {
                    align: "justify",
                    indent: 25,
                });
        });
    });
};

export const drawParaWiseReply = (doc: any, replySections: any) => {
    replySections.forEach((section: any) => {
        doc.addPage();

        doc.font("Helvetica-Bold")
            .fontSize(14)
            .text(section.title, { align: "center" });

        doc.moveDown();

        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown();

        section.replies.forEach((r: any) => {
            doc.fontSize(12).text(
                `Para ${r.paraNo}: ${r.text}`,
                { align: "justify", indent: 20 }
            );
            doc.moveDown();
        });
    });
};

export const drawEvidenceAffidavit = (doc: any, affidavit: any) => {
    doc.addPage();

    doc.font("Helvetica-Bold")
        .fontSize(14)
        .text(affidavit.title, { align: "center" });

    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    doc.moveDown();

    affidavit.content.forEach((para: string, i: number) => {
        doc.text(`${i + 1}. ${para}`, {
            align: "justify",
            indent: 20,
        });
        doc.moveDown();
    });
};

export const drawTimeline = (doc: any, timeline: any) => {
    doc.addPage();

    doc.text("CASE TIMELINE", { align: "center" });

    doc.moveDown();

    timeline.forEach((t, i) => {
        doc.text(`${i + 1}. ${t.date} – ${t.event}`);
    });
};

export const drawArguments = (doc: any, args: any) => {
    doc.addPage();

    doc.text("ARGUMENT NOTES", { align: "center" });

    doc.moveDown();

    args.forEach((a, i) => {
        doc.text(`${i + 1}. ${a}`);
    });
};

export const drawFinalArguments = (doc: any, script: string[]) => {
    doc.addPage();

    doc.font("Helvetica-Bold")
        .fontSize(14)
        .text("FINAL ARGUMENTS", { align: "center" });

    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    doc.moveDown();

    script.forEach((line) => {
        doc.font("Helvetica")
            .fontSize(12)
            .text(line, {
                align: "justify",
                indent: 20,
            });

        doc.moveDown(0.5);
    });
};

export const drawWrittenArguments = (doc: any, content: any[]) => {
    doc.addPage();

    content.forEach((item) => {
        if (item.type === "heading") {
            doc.font("Helvetica-Bold")
                .fontSize(14)
                .text(item.text, { align: "center" });

            doc.moveDown();
        }

        else if (item.type === "subheading") {
            doc.font("Helvetica")
                .fontSize(12)
                .text(item.text, { align: "center" });

            doc.moveDown();
        }

        else if (item.type === "paragraph") {
            doc.font("Helvetica")
                .fontSize(12)
                .text(item.text, {
                    align: "justify",
                    indent: 20,
                });

            doc.moveDown(0.5);
        }

        else if (typeof item === "string") {
            doc.moveDown();
        }
    });
};

export const drawJudgeQA = (doc: any, qa: any) => {
    doc.addPage();
    doc.text("POSSIBLE COURT QUESTIONS", { align: "center" });

    doc.moveDown();

    qa.forEach((item: any, i: number) => {
        doc.text(`${i + 1}. Q: ${item.question}`);
        doc.text(`   A: ${item.answer}`);
        doc.text(`   Risk: ${item.risk}`);
        doc.moveDown();
    });
};

export const drawMultiSignatures = async (doc: any, document_id: string) => {
    const drawWatermark = (doc: any, status: string) => {
        const textMap: any = {
            draft: "DRAFT",
            signing: "PENDING",
            completed: "EXECUTED",
        };

        const text = textMap[status] || "DOCUMENT";

        // Save current state
        doc.save();

        // Big transparent watermark
        doc.fontSize(60);
        doc.fillColor("gray", 0.2);

        // Rotate for diagonal effect
        doc.rotate(-45, { origin: [300, 400] });

        doc.text(text, 100, 300, {
            align: "center",
            width: 400,
        });

        // Restore state
        doc.restore();
    };

    const drawSignatureVersion = (doc: any, signer: any, index: number) => {
        doc.addPage();

        doc.fontSize(14).text(`SIGNATURE VERSION ${index + 1}`);

        doc.moveDown();

        doc.text(`Role: ${signer.role}`);
        doc.text(`Signed By: ${signer.user_name}`);
        doc.text(`Hash: ${signer.document_hash}`);
        doc.text(`Previous Hash: ${signer.previous_hash || "GENESIS"}`);

        doc.text(`Timestamp: ${new Date(signer.signed_at).toLocaleString()}`);
    };

    const { data: signers } = await supabaseAdmin
        .from("document_signers")
        .select("*")
        .eq("document_id", document_id);

    signers?.forEach((signer, index) => drawSignatureVersion(doc, signer, index));
};

export const embedSignatureInfo = (
    doc: any,
    signerName: string
) => {
    doc.image("seal.png", 400, 700, { width: 100 });

    doc.fontSize(10);
    doc.text("Digitally Signed by:", 400, 680);
    doc.text(signerName, 400, 695);
    doc.text(
        "Date: " + new Date().toLocaleString(),
        400,
        710
    );
};

export const drawSignatureBlock = async ({
    doc,
    user_name,
    certInfo,
    signature,
    hash,
    verificationUrl,
    chamber_id,
    txHash,
}: {
    doc: any;
    user_name: string;
    certInfo: any;
    signature: string;
    hash: string;
    verificationUrl: string;
    chamber_id: string;
    txHash: string;
}) => {
    const timestamp = new Date().toISOString();

    doc.moveDown();

    doc.fontSize(11);

    doc.text(`Signed By (CN): ${certInfo.subjectCN}`);
    doc.text(`Issued By: ${certInfo.issuerCN}`);
    doc.text(
        `Valid From: ${certInfo.validFrom.toLocaleString()}`
    );
    doc.text(
        `Valid To: ${certInfo.validTo.toLocaleString()}`
    );

    doc.text(`Serial No: ${certInfo.serialNumber}`);

    doc.moveDown();

    doc.text(`Signature (SHA256):`);
    doc.fontSize(8).text(signature.substring(0, 120) + "...");

    doc.moveDown();

    doc.text(`Generated At: ${new Date().toISOString()}`);

    doc.moveDown();

    doc.text("This document is digitally signed using a valid DSC token.");

    doc.text(`Timestamp: ${timestamp}`);
    doc.text("This report is accompanied by a certificate under Section 65B of the Indian Evidence Act, 1872.");


    // 7. 65B Certificate Page
    doc.addPage();

    const certificateText = generate65BCertificateText({
        chamber_id,
        user_name: "Authorized Signatory", // later fetch from DB
    });

    doc.fontSize(12).text(certificateText, {
        align: "left",
    });
    doc.text(certificateText);
    doc.text(`Blockchain Tx: ${txHash}`);

    doc.fillColor("blue").text(
        `Blockchain Tx: ${txHash}`,
        { link: `https://polygonscan.com/tx/${txHash}` }
    );
    doc.fillColor("black");

    const qrBuffer = await QRCode.toBuffer(verificationUrl);

    doc.image(qrBuffer, {
        fit: [200, 200],
        align: "center",
    });

    doc.moveDown();
    doc.text(verificationUrl, { align: "center" });

    doc.addPage();
    doc.text("Digital Signature:");
    doc.text(signature);

    doc.addPage();

    doc.fontSize(14).text("DIGITAL SIGNATURE CERTIFICATE", {
        align: "center",
    });

    const affidavitBuffer = await generate65BCertificate({
        user_name,
        certInfo,
        hash,
        txHash,
    });

    const startX = 50;
    const startY = 100;

    // 6. QR Code
    // 🔐 Generate QR
    const qrDataUrl = await QRCode.toDataURL(verificationUrl);

    doc.image(qrDataUrl, startX + 380, startY + 10, {
        width: 100,
    });

    // Optional Seal
    try {
        doc.image("server/assets/seal.png", startX + 380, startY + 80, {
            width: 80,
        });
    } catch { }

    doc.moveDown();

    doc.addPage();
    doc.text("Verification QR", { align: "center" });
    doc.image(qrDataUrl, {
        fit: [200, 200],
        align: "center",
    });

    // append as new pages
    doc.addPage();
    doc.text("Section 65B Certificate Attached Below");

    doc.addPage();
    doc.image(affidavitBuffer, 0, 0);
};


export const generateHash = (data: string) => {
    return crypto.createHash("sha256").update(data).digest("hex");
};

export const qrDataUrl = async (data: string) => {
    return await QRCode.toDataURL(data);
};

export const createVerificationURL = (hash: string) => {
    return `${process.env.FRONTEND_URL || "https://yourdomain.com"}/verify?hash=${hash}`;
};

export const saveAuditVerificationReport = async ({
    chamber_id,
    hash,
    signature,
    verificationId,
}: {
    chamber_id: string;
    hash: string;
    signature: string;
    verificationId: string;
}) => {
    await supabaseAdmin.from("audit_verifications").insert({
        id: verificationId,
        chamber_id,
        hash,
    });

    await saveAuditReport({
        chamber_id,
        hash,
        signature,
    });
};

export const generateFullFilingBundle = async ({
    argumentsText,
    annexures = [],
}: {
    argumentsText: any[];
    annexures?: any[];
}) => {
    const pdfDoc = await PDFDocument.create();

    // 1️⃣ COVER PAGE
    drawCoverPage(pdfDoc);

    // 3️⃣ MAIN ARGUMENTS
    drawWrittenArguments(pdfDoc, argumentsText);

    // 4️⃣ ANNEXURES
    annexures.forEach((doc, i) => {
        drawAnnexure(pdfDoc, doc, i + 1);
    });

    const drawIndex = (pdfDoc, annexures) => {
        const page = pdfDoc.addPage();

        page.drawText("INDEX", { x: 50, y: 750, size: 14 });

        annexures.forEach((a, i) => {
            page.drawText(
                `${i + 1}. ${a.title} ........ Page ${i + 2}`,
                { x: 50, y: 720 - i * 20, size: 10 }
            );
        });
    };

    const drawAnnexure = (pdfDoc, doc, index) => {
        const page = pdfDoc.addPage();

        page.drawText(`ANNEXURE ${index}`, {
            x: 50,
            y: 750,
            size: 12,
        });

        page.drawText(doc.content || "Document content", {
            x: 50,
            y: 720,
            size: 10,
        });
    };

    return await pdfDoc.save();
};

export const generatePdf = async ({
    paragraphs = [],
    document,
    signers = [],
}: {
    paragraphs?: string[];
    document?: any;
    signers?: any[];
}) => {
    const PDFDocumentKit = require("pdfkit");

    const doc = new PDFDocumentKit();

    const buffers: Buffer[] = [];
    doc.on("data", buffers.push.bind(buffers));

    return new Promise<Buffer>((resolve) => {
        doc.on("end", () => resolve(Buffer.concat(buffers)));

        // HEADER
        doc.fontSize(14).text("MAIN DOCUMENT", { align: "center" });

        doc.moveDown();

        // LINE SEPARATOR
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown();

        // ✅ NUMBERED PARAGRAPHS
        paragraphs.forEach((para, index) => {
            doc.moveDown(0.5);

            doc.fontSize(12).text(
                `${index + 1}. ${para}`,
                {
                    align: "justify",
                    indent: 25,
                    lineGap: 4,
                }
            );
        });

        // 2. SIGNATURE VERSIONS (THIS IS WHERE YOU ADD)
        signers.forEach((s, i) => {
            drawSignatureVersion(doc, s, i);
        });

        doc.end();
    });
};

const drawCoverPage = (pdfDoc: any) => {
    const page = pdfDoc.addPage([600, 800]);
    page.drawText("Cover Page", { x: 50, y: 740, size: 24 });
};

const drawIndex = (pdfDoc: any, annexures: any[]) => {
    const page = pdfDoc.addPage([600, 800]);
    page.drawText("Index", { x: 50, y: 740, size: 18 });

    annexures.forEach((annex, index) => {
        page.drawText(
            `${index + 1}. ${annex?.title || `Annexure ${index + 1}`}`,
            { x: 50, y: 700 - index * 20, size: 12 }
        );
    });
};

const drawAnnexure = (pdfDoc: any, doc: any, index: number) => {
    const page = pdfDoc.addPage([600, 800]);
    page.drawText(`Annexure ${index}`, { x: 50, y: 740, size: 18 });
    page.drawText(doc?.title || "Attachment", { x: 50, y: 720, size: 12 });

    if (typeof doc?.content === "string") {
        page.drawText(doc.content, { x: 50, y: 700, size: 10, maxWidth: 500 });
    }
};

const drawSignatureVersion = (doc: any, signer: any, index: number) => {
    doc.addPage();

    doc.fontSize(14).text(`SIGNATURE VERSION ${index + 1}`);

    doc.moveDown();

    if (signer.role) {
        doc.text(`Role: ${signer.role}`);
    }
    if (signer.user_name) {
        doc.text(`Signed By: ${signer.user_name}`);
    }
    if (signer.document_hash) {
        doc.text(`Hash: ${signer.document_hash}`);
    }
    if (signer.previous_hash) {
        doc.text(`Previous Hash: ${signer.previous_hash}`);
    }
    if (signer.signed_at) {
        doc.text(`Timestamp: ${new Date(signer.signed_at).toLocaleString()}`);
    }
};

