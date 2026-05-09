import React, { useState } from "react";
import axios from "axios";

const CoCounselPanel = ({ caseId }) => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<any>(null);

    const handleRun = async () => {
        const res = await axios.post("/api/co-counsel", {
            text: input,
            caseId,
            role: "opponent",
        });

        setResult(res.data);
    };

    return (
        <div style={{ padding: 20 }}>
            <h3>🧠 AI Co-Counsel</h3>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter live statement..."
                style={{ width: "100%", height: 80 }}
            />

            <button onClick={handleRun}>Run Analysis</button>

            {result && (
                <div style={{ marginTop: 20 }}>
                    <p>⚠ {result.contradiction}</p>
                    <p>📊 Weakness: {result.weakness?.level}</p>
                    <p>⚖ Strategy: {result.strategy?.action}</p>
                    <p>⏱ Timing: {result.timing?.decision}</p>
                    <p>🗣 Objection: {result.objection}</p>
                    <p>❓ Follow-up: {result.followUp}</p>
                    <p>🎯 Win: {result.win?.probability}%</p>
                    <p>🧑‍⚖️ Judge: {result.judgeMood?.mood}</p>
                </div>
            )}
        </div>
    );
};

export default CoCounselPanel;