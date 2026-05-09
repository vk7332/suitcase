import React, { useState } from "react";
import axios from "axios";

const signWithDSC = async () => {
    // 1️⃣ Get PDF hash from backend
    const hashRes = await axios.post("/api/get-pdf-hash", {
        content: draft,
    });

    const hash = hashRes.data.hash;

    // 2️⃣ Send to local signer (USB token)
    const signRes = await fetch("http://localhost:3001/sign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ hash }),
    });

    const { signature } = await signRes.json();

    // 3️⃣ Send signature back to backend
    const finalPDF = await axios.post(
        "/api/embed-signature",
        {
            content: draft,
            signature,
        },
        { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(
        new Blob([finalPDF.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "signed.pdf";
    link.click();
};

const downloadBundle = async () => {
    const res = await axios.post(
        "/api/generate-bundle",
        {
            caseTitle: "Sample Case",
            advocateName: "Adv Vipin Kumar",
            mainContent: draft,
            annexures: [
                { title: "Agreement", content: "Agreement text..." },
                { title: "Notice", content: "Legal notice..." },
            ],
        },
        { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "bundle.pdf";
    link.click();
};

const VoiceDraft = ({ text }: { text: string }) => {
    const [draft, setDraft] = useState("");

    const generateDraft = async () => {
        const res = await axios.post("/api/voice-draft", {
            text,
        });

        setDraft(res.data.draft);
    };

    const downloadPDF = async () => {
        const res = await axios.post(
            "/api/generate-submission-pdf",
            {
                content: draft,
                caseTitle: "Sample Case",
                advocateName: "Advocate Vipin Kumar",
            },
            {
                responseType: "blob",
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([res.data])
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "submission.pdf");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div style={{ marginTop: 20 }}>
            <button onClick={generateDraft}>
                ✍ Convert to Written Submission
            </button>

            {draft && (
                <>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {draft}
                    </pre>

                    <button onClick={downloadPDF}>
                        📄 Download Court PDF
                    </button>

                    <button onClick={signWithDSC}>
                        🔐 Sign with DSC
                    </button>
                </>
            )}
        </div>
    );
};

export default VoiceDraft;