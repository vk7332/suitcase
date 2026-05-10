import React, { useState } from "react";
import axios from "axios";

const LegalResearchBox = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<any>(null);

    const handleAsk = async () => {
        const res = await axios.post("/api/legal-research", {
            query,
        });

        setResult(res.data);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>Ask Legal AI</h3>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask legal question..."
                style={{ width: "60%" }}
            />

            <button onClick={handleAsk}>Ask</button>

            {result && (
                <div style={{ marginTop: 20 }}>
                    <h4>Answer</h4>
                    <p>{result.answer}</p>

                    <h4>Reasoning</h4>
                    {result.reasoning.map((r: string, i: number) => (
                        <p key={i}>• {r}</p>
                    ))}

                    <h4>Case Laws</h4>
                    {result.cases.map((c: any, i: number) => (
                        <div key={i}>
                            <strong>{c.title}</strong>
                            <p>{c.principle}</p>
                        </div>
                    ))}

                    <p>Confidence: {result.confidence}%</p>
                </div>
            )}
        </div>
    );
};

export default LegalResearchBox;
