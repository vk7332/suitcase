import React, { useState } from "react";
import axios from "axios";

const LimitationBox = ({ caseId }) => {
    const [facts, setFacts] = useState("");
    const [result, setResult] = useState<any>(null);

    const detect = async () => {
        const res = await axios.post("/api/detect-limitation", {
            facts,
            case_id: caseId,
        });

        setResult(res.data);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>⏳ Limitation Detector (AI)</h3>

            <textarea
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                placeholder="Paste case facts..."
                style={{ width: "100%", height: 100 }}
            />

            <button onClick={detect}>Detect Limitation</button>

            {result && (
                <div style={{ marginTop: 20 }}>
                    <h4>⚖️ Limitation Analysis</h4>
                </div>
            )}

            {result?.triggers?.map((t, i) => (
                <div key={i}>
                    <p>📌 {t.type}</p>
                    <p>Date: {t.date}</p>
                    <p>Deadline: {new Date(t.deadline).toLocaleDateString()}</p>
                    <p>Days Left: {t.daysLeft}</p>
                </div>
            ))}

            {result && (
                <div style={{ marginTop: 15 }}>
                    <p><strong>Cause Date:</strong> {result.ai?.cause_date}</p>
                    <p><strong>Case Type:</strong> {result.ai?.case_type}</p>
                    <p><strong>Days:</strong> {result.ai?.limitation_days}</p>

                    <p><strong>Deadline:</strong> {
                        result.calculation?.deadline &&
                        new Date(result.calculation.deadline).toLocaleDateString()
                    }</p>

                    <p><strong>Days Left:</strong> {result.calculation?.daysLeft}</p>

                    <p><strong>Confidence:</strong> {result.ai?.confidence}</p>

                    {result.ai?.notes && (
                        <p>⚠ {result.ai.notes}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default LimitationBox;
