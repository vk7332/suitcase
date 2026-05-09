import React from "react";
import { signHashWithDSC } from "../../services/signerDigital";
import { api } from "../../lib/api";
import CertificateInfo from "../../components/certificate/CertificateInfo";

const AuditReport = () => {
    const [certInfo, setCertInfo] = useState<any>(null);

    const handleSignAndDownload = async () => {
        const { data } = await api.get("/audit/hash");

        const signRes = await signHashWithDSC(data.hash);

        const certificate = signRes.certificate;

        // Send to backend (backend parses)
        const res = await api.post("/audit/parse-cert", {
            certificate,
        });

        setCertInfo(res.data);

        // Continue finalize...
    };

    try {
        const { data } = await api.get("/audit/hash");
        const signRes = await signHashWithDSC(data.hash);
        const certificate = signRes.certificate;
        const finalizeRes = await api.post("/audit/finalize", {
            hash: data.hash,
            signature: signRes.signature,
            certificate,
        }, {
            responseType: "blob", // important for PDF
        });

        // 4. Download PDF
        const url = window.URL.createObjectURL(new Blob([pdfRes.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "audit-report.pdf";
        a.click();
    }
    catch (err: any) {
        alert(err.message);
    }
    return React.createElement(
        "button",
        { onClick: handleSignAndDownload },
        "Sign & Download Audit Report"
    );

    export default AuditReport;