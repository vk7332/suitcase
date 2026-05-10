import React, { useState } from "react";
import axios from "axios";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

const HearingRecorder = () => {
    const [draft, setDraft] = useState("");

    const {
        transcript,
        listening,
        resetTranscript,
    } = useSpeechRecognition();

    const convert = async () => {
        const res = await axios.post("/api/hearing-to-draft", {
            transcript,
        });

        setDraft(res.data.draft);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>🎤 Hearing Recorder</h3>

            <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
                ▶ Start
            </button>

            <button onClick={SpeechRecognition.stopListening}>
                ⏹ Stop
            </button>

            <button onClick={resetTranscript}>
                🔄 Reset
            </button>

            <p><strong>Transcript:</strong></p>
            <div style={{ border: "1px solid #ccc", padding: 10 }}>
                {transcript}
            </div>

            <button onClick={convert}>
                📄 Convert to Written Arguments
            </button>

            <button onClick={convert}>
                📄 Convert to Written Arguments
            </button>

            <button onClick={generateFinalBundle}>
                📦 Generate Final Filing Bundle
            </button>

            {draft && (
                <pre style={{ whiteSpace: "pre-wrap", marginTop: 10 }}>
                    {draft}
                </pre>
            )}
        </div>
    );
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

export default HearingRecorder;
