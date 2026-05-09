const CertificateInfo = ({ certInfo }: any) => {
    if (!certInfo) return null;

    return (
        <div className="cert-box">
            <h3>Digital Signature Certificate</h3>
            <p><strong>Signed By:</strong> {certInfo.subjectCN}</p>
            <p><strong>Issuer:</strong> {certInfo.issuerCN}</p>
            <p><strong>Valid From:</strong> {new Date(certInfo.validFrom).toLocaleString()}</p>
            <p><strong>Valid To:</strong> {new Date(certInfo.validTo).toLocaleString()}</p>
        </div>
    );
};

export default CertificateInfo;
