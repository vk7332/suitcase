import React, { useState } from "react";
import axios from "axios";

const AIAssistant = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<any>(null);
    const [draft, setDraft] = useState("");

    const askAI = async () => {
        const res = await axios.post("/api/ask-ai", { query });
        setResult(res.data);
    };

    const generateDraft = async () => {
        const res = await axios.post("/api/generate-draft", {
            query,
            type: "plaint",
        });

        setDraft(res.data.draft);
    };

    return (
        <div style={{ marginTop: 40 }}>
            <h3>AI Legal Assistant</h3>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask legal question..."
                style={{ width: "60%" }}
            />

            <div>
                <button onClick={askAI}>Ask AI</button>
                <button onClick={generateDraft}>Generate Draft</button>
            </div>

            {/* AI RESULT */}
            {result && (
                <div>
                    <h4>Answer</h4>
                    <p>{result.answer}</p>

                    <h4>Reasoning</h4>
                    {result.reasoning?.map((r: string, i: number) => (
                        <p key={i}>• {r}</p>
                    ))}

                    <h4>Case Laws</h4>
                    {result.cases?.map((c: any, i: number) => (
                        <div key={i}>
                            <strong>{c.title}</strong>
                            <p>{c.principle}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* DRAFT */}
            {draft && (
                <div style={{ marginTop: 20 }}>
                    <h4>Generated Draft</h4>
                    <pre>{draft}</pre>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;