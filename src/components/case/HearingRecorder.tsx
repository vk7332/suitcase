import React, { useState } from "react";
import axios from "axios";

const HearingRecorder = () => {
    const [draft, setDraft] = useState("");
    const [transcript, setTranscript] = useState("");
    const [listening, setListening] = useState(false);

    const convert = async () => {
        const res = await axios.post("/api/hearing-to-draft", {
            transcript,
        });

        setDraft(res.data.draft);
    };

    const generateFinalBundle = async () => {
        const res = await axios.post(
            "/api/final-bundle",
            {
                transcript,
                caseTitle: "My Case",
                advocateName: "Adv Vipin Kumar",
            },
            { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "final_bundle.pdf";
        link.click();
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>🎤 Hearing Recorder</h3>

            <div className="flex gap-2 mb-4">
                <button 
                    onClick={() => setListening(true)}
                    className={`px-4 py-2 rounded ${listening ? 'bg-red-500' : 'bg-green-600'} text-white`}
                >
                    ▶ Start
                </button>

                <button 
                    onClick={() => setListening(false)}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                    ⏹ Stop
                </button>

                <button 
                    onClick={() => setTranscript("")}
                    className="bg-gray-200 px-4 py-2 rounded"
                >
                    🔄 Reset
                </button>
            </div>

            <p><strong>Transcript:</strong></p>
            <textarea 
                className="w-full border p-2 rounded mb-4"
                rows={4}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Speech to text results will appear here..."
            />

            <div className="flex flex-col gap-2">
                <button 
                    onClick={convert}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    📄 Convert to Written Arguments
                </button>

                <button 
                    onClick={generateFinalBundle}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    📦 Generate Final Filing Bundle
                </button>
            </div>

            {draft && (
                <div className="mt-4 p-4 bg-gray-50 border rounded">
                    <h4 className="font-bold mb-2">Generated Draft:</h4>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {draft}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default HearingRecorder;
