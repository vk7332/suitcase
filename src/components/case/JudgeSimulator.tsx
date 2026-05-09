import React, { useState } from "react";
import axios from "axios";

const JudgeSimulator = () => {
    const [facts, setFacts] = useState("");
    const [args, setArgs] = useState("");
    const [result, setResult] = useState<any>(null);

    const simulate = async () => {
        const res = await axios.post("/api/judge-simulate", {
            facts,
            argumentsText: args,
        });

        setResult(res.data);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>⚖️ AI Judge Simulation</h3>

            <textarea
                placeholder="Enter case facts..."
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                style={{ width: "100%", height: 80 }}
            />

            <textarea
                placeholder="Enter your arguments..."
                value={args}
                onChange={(e) => setArgs(e.target.value)}
                style={{ width: "100%", height: 80, marginTop: 10 }}
            />

            <button onClick={simulate}>
                🎭 Simulate Hearing
            </button>

            {result && (
                <div style={{ marginTop: 20 }}>
                    <h4>👨‍⚖️ Judge Questions</h4>
                    {result.questions?.map((q, i) => (
                        <p key={i}>❓ {q}</p>
                    ))}

                    <h4>⛔ Interruptions</h4>
                    {result.interruptions?.map((q, i) => (
                        <p key={i}>⚠ {q}</p>
                    ))}

                    <h4>⚔ Opponent Objections</h4>
                    {result.objections?.map((q, i) => (
                        <p key={i}>🛑 {q}</p>
                    ))}

                    <h4>✅ Best Responses</h4>
                    {result.best_responses?.map((q, i) => (
                        <p key={i}>💡 {q}</p>
                    ))}

                    <h4>📌 Judge Observation</h4>
                    <p>{result.judge_observation}</p>
                </div>
            )}
        </div>
    );
};

export default JudgeSimulator;