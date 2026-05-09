import React, { useState } from "react";
import axios from "axios";

const AnalyticsDashboard = () => {
    const [facts, setFacts] = useState("");
    const [data, setData] = useState<any>(null);

    const analyze = async () => {
        const res = await axios.post("/api/analytics", {
            facts,
        });

        setData(res.data);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>📊 Courtroom Analytics</h3>

            <textarea
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                placeholder="Enter case facts..."
                style={{ width: "100%", height: 100 }}
            />

            <button onClick={analyze}>Analyze Case</button>

            {data && (
                <div style={{ marginTop: 20 }}>
                    <h4>⚖️ Score: {data.score}/100</h4>
                    <h4>🎯 Win Probability: {data.probability}%</h4>

                    <h4>✔ Strengths</h4>
                    {data.strengths.map((s, i) => <p key={i}>• {s}</p>)}

                    <h4>❌ Weaknesses</h4>
                    {data.weaknesses.map((w, i) => <p key={i}>• {w}</p>)}

                    <h4>📉 Missing Evidence</h4>
                    {data.missing.map((m, i) => <p key={i}>• {m}</p>)}

                    <h4>👨‍⚖️ Judge Style</h4>
                    <p>{data.judge?.style}</p>

                    <h4>🎯 Judge Focus</h4>
                    <p>{data.judge?.focus}</p>

                    <h4>⚠ Irritates Judge</h4>
                    {data.judge?.irritants.map((i, idx) => <p key={idx}>• {i}</p>)}

                    <h4>✅ Impresses Judge</h4>
                    {data.judge?.preferences.map((p, idx) => <p key={idx}>• {p}</p>)}
                </div>
            )}
        </div>
    );
};

export default AnalyticsDashboard;