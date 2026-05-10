import React, { useState } from "react";
import axios from "axios";

const LifecycleTracker = () => {
    const [stage, setStage] = useState("filing");
    const [next, setNext] = useState("");

    const check = async () => {
        const res = await axios.post("/api/lifecycle", { stage });
        setNext(res.data.next);
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>⚖️ Case Lifecycle</h3>

            <select value={stage} onChange={(e) => setStage(e.target.value)}>
                <option value="filing">Filing</option>
                <option value="summons">Summons</option>
                <option value="evidence">Evidence</option>
                <option value="arguments">Arguments</option>
                <option value="judgment">Judgment</option>
                <option value="appeal">Appeal</option>
            </select>

            <button onClick={check}>Check Next Step</button>

            {next && (
                <div>
                    <h4>➡ Next Step</h4>
                    <p>{next}</p>
                </div>
            )}
        </div>
    );
};

export default LifecycleTracker;
