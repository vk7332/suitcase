import React, { useState } from "react";
import axios from "axios";

const StrategyBox = () => {
    const [facts, setFacts] = useState("");
    const [result, setResult] = useState<any>(null);

    const analyze = async () => {
        const res = await axios.post("/api/strategy", {
            facts,
        });

        setResult(res.data);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>⚖️ Court Strategy Engine</h3>

            <textarea
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                placeholder="Enter case facts..."
                style={{ width: "100%", height: 100 }}
            />

            <button onClick={analyze}>Analyze Strategy</button>

            {result && (
                <div>
                    <h4>✔ Argue</h4>
                    {result.argue.map((a, i) => <p key={i}>• {a}</p>)}

                    <h4>❌ Avoid</h4>
                    {result.avoid.map((a, i) => <p key={i}>• {a}</p>)}

                    <h4>⚔ Opponent</h4>
                    {result.opponent.map((a, i) => <p key={i}>• {a}</p>)}

                    <h4>🛡 Counter</h4>
                    {result.counter.map((a, i) => <p key={i}>• {a}</p>)}

                    <h4>⚠ Risks</h4>
                    {result.risks.map((a, i) => <p key={i}>• {a}</p>)}

                    <h4>🏆 Final Strategy</h4>
                    <p>{result.strategy}</p>
                </div>
            )}
        </div>
    );
};

export default StrategyBox;