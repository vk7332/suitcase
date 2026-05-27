import React, { useState } from "react";
import axios from "axios";

const AIDraft = () => {
    const [caseNotes, setCaseNotes] = useState("");
    const [sections, setSections] = useState<any[]>([]);

    const generateDraft = async () => {
        const res = await axios.post("/api/ai-draft", { caseNotes });
        setSections(res.data.sections);
    };

    return (
        <div>
            <h2>AI Drafting</h2>

            <textarea
                value={caseNotes}
                onChange={(e) => setCaseNotes(e.target.value)}
                rows={6}
                style={{ width: "100%" }}
            />

            <button onClick={generateDraft}>Generate Draft</button>

            {sections.map((s, i) => (
                <div key={i}>
                    <h3>{s.title}</h3>
                    {s.content.map((p: string, idx: number) => (
                        <p key={idx}>{idx + 1}. {p}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AIDraft;
