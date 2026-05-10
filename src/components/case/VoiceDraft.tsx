import { useState } from "react";
import axios from "axios";

const VoiceDraft = ({ text }: { text: string }) => {
    const [draft, setDraft] = useState("");

    const generateDraft = async () => {
        try {
            const res = await axios.post("/api/voice-draft", {
                text,
            });
            setDraft(res.data.draft);
        } catch (e) {
            console.error("Failed to generate draft", e);
        }
    };

    const signWithDSC = async () => {
        try {
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
        } catch (e) {
            console.error("Failed to sign PDF", e);
        }
    };

    const downloadBundle = async () => {
        try {
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
        } catch (e) {
            console.error("Failed to download bundle", e);
        }
    };

    const downloadPDF = async () => {
        try {
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
        } catch (e) {
            console.error("Failed to download PDF", e);
        }
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h3>✍ Voice Drafting Assistant</h3>
            <button onClick={generateDraft}>Generate Draft from Voice</button>
            
            {draft && (
                <div style={{ marginTop: 15 }}>
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={10}
                        style={{ width: "100%", padding: 10 }}
                    />
                    <div style={{ marginTop: 10 }}>
                        <button onClick={downloadPDF}>Download PDF</button>
                        <button onClick={signWithDSC} style={{ marginLeft: 10 }}>Sign with DSC</button>
                        <button onClick={downloadBundle} style={{ marginLeft: 10 }}>Download Bundle</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceDraft;
