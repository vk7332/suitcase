import { useState } from "react";
import { api } from "../../lib/api";
import { signHashWithDSC } from "../../services/signer-digital";

const SignDocument = ({ documentId }: any) => {
    const [otp, setOtp] = useState("");

    const requestOTP = async () => {
        await api.post("/documents/request-otp");
        alert("OTP sent");
    };

    const handleSign = async () => {
        const { data } = await api.get(`/documents/${documentId}/hash`);

        const signRes = await signHashWithDSC(data.hash);

        await api.post("/documents/sign", {
            document_id: documentId,
            signature: signRes.signature,
            certificate: signRes.certificate,
            otp,
        });

        alert("Signed successfully");
    };

    return (
        <div>
            <h2>Sign Document</h2>

            <button onClick={requestOTP}>Send OTP</button>

            <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={handleSign}>
                Sign with DSC
            </button>
        </div>
    );
};

export default SignDocument;
