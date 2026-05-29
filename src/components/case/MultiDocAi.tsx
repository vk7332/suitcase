import React, { useState } from "react";
import axios from "axios";

const MultiDocAI = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<any>(null);

    const runAnalysis = async () => {
        const res = await axios.post("/api/multi-reason", {
            query,
        });

        setResult(res.data);
    };

    return (
        <div style={{ marginTop: 40 }}>
            <h3>Advanced Legal Reasoning (Multi-Case)</h3>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask complex legal question..."
                style={{ width: "60%" }}
            />

            <button onClick={runAnalysis}>Analyze</button>

            {result && (
                <div style={{ marginTop: 20 }}>
                    <h4>Final Answer</h4>
                    <p>{result.answer}</p>

                    <h4>Combined Reasoning</h4>
                    {result.combined_reasoning?.map((r: string, i: number) => (
                        <p key={i}>• {r}</p>
                    ))}

                    <h4>Cases Used</h4>
                    {result.cases_used?.map((c: string, i: number) => (
                        <p key={i}>{c}</p>
                    ))}

                    <h4>Conflicts</h4>
                    {result.conflicts?.map((c: string, i: number) => (
                        <p key={i}>⚠ {c}</p>
                    ))}

                    <p>Confidence: {result.confidence}%</p>
                </div>
            )}
        </div>
    );
};

export default MultiDocAI;
