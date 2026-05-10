import React, { useState } from "react";
import axios from "axios";

const AutopilotBox = () => {
    const [facts, setFacts] = useState("");
    const [stage, setStage] = useState("drafting");
    const [result, setResult] = useState<any>(null);

    const handleDraft = async () => {
        await axios.post("/api/auto/draft", { step: result.step });
    };

    const handleAttach = async () => {
        await axios.post("/api/auto/attach", { step: result.step });
    };

    const handleFile = async () => {
        await axios.post("/api/auto/file", { step: result.step });
    };

    const run = async () => {
        const res = await axios.post("/api/autopilot", {
            facts,
            stage,
        });

        setResult(res.data);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>🧠 Litigation Autopilot</h3>

            <textarea
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                placeholder="Enter case facts..."
                style={{ width: "100%", height: 100 }}
            />

            <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
            >
                <option value="drafting">Drafting</option>
                <option value="evidence">Evidence</option>
                <option value="arguments">Arguments</option>
                <option value="appeal">Appeal</option>
            </select>

            <button onClick={run}>Suggest Next Step</button>

            {result && (
                <div style={{ marginTop: 20 }}>
                    <h4>➡ Next Step</h4>
                    <p>{result.step}</p>

                    {result && (
                        <div style={{ marginTop: 15 }}>
                            <button onClick={handleDraft}>📄 Draft</button>
                            <button onClick={handleAttach}>📎 Attach</button>
                            <button onClick={handleFile}>📤 File</button>
                        </div>
                    )}

                    <h4>📌 Reason</h4>
                    <p>{result.reason}</p>

                    <h4>⚠ Risk</h4>
                    <p>{result.risk}</p>

                    <h4>✍ Draft</h4>
                    <pre>{result.draft}</pre>
                </div>
            )}
        </div>
    );
};

export default AutopilotBox;
