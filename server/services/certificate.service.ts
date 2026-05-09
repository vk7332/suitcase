import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { supabaseAdmin } from "../config/supabase";
import { signHash } from "../utils/signature";
import { saveAuditReport } from "./report.service";
import { generateHash } from "./pdf.service";


export const generate65BCertificateText = ({
    chamber_id,
    user_name,
}: {
    chamber_id: string;
    user_name: string;
}) => {
    const date = new Date().toLocaleDateString("en-IN");

    return `
CERTIFICATE UNDER SECTION 65B OF THE INDIAN EVIDENCE ACT, 1872

I, ${user_name}, being responsible for the operation of the computer system used by the organization identified as Chamber ID ${chamber_id}, do hereby certify as follows:

1. That the computer system used for generating the attached electronic record is regularly used for storing and processing information in the ordinary course of activities.

2. That the information contained in the electronic record was regularly fed into the system during the ordinary course of said activities.

3. That throughout the material part of the period, the computer system was operating properly, and if not, any malfunction did not affect the integrity of the electronic record.

4. That the information reproduced in the accompanying electronic record is derived from the data stored in the system in the ordinary course of activities.

5. That the system employs secure mechanisms including audit logs, cryptographic hashing, and access controls to ensure data integrity and prevent unauthorized tampering.

This certificate is issued to accompany the electronic record and is true to the best of my knowledge and belief.

Place: __________

Date: ${date}

Signature:
${user_name}
`;
};

export const create65BCertificate = async ({
    chamber_id,
    user_name,
}: {
    chamber_id: string;
    user_name: string;
}) => {
    const certificateText = generate65BCertificateText({
        chamber_id,
        user_name,
    });

    return certificateText;
};