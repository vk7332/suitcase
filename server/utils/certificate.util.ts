import forge from "node-forge";

export const parseCertificate = (base64Cert: string) => {
    try {
        // Convert base64 → DER → ASN.1
        const der = forge.util.decode64(base64Cert);
        const asn1 = forge.asn1.fromDer(der);
        const cert = forge.pki.certificateFromAsn1(asn1);

        // Subject (CN = Common Name)
        const subjectCN =
            cert.subject.getField("CN")?.value || "Unknown";

        // Issuer
        const issuerCN =
            cert.issuer.getField("CN")?.value || "Unknown";

        // Validity
        const validFrom = cert.validity.notBefore;
        const validTo = cert.validity.notAfter;

        return {
            subjectCN,
            issuerCN,
            validFrom,
            validTo,
            serialNumber: cert.serialNumber,
        };
    } catch (err) {
        throw new Error("Certificate parsing failed");
    }
};