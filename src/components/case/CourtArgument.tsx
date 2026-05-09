import React, { useState } from "react";
import axios from "axios";

const CourtArgument = () => {
    const [query, setQuery] = useState("");
    const [script, setScript] = useState("");

    const generate = async () => {
        const res = await axios.post("/api/court-argument", {
            query,
        });

        setScript(res.data.script);
    };

    return (
        <div style={{ marginTop: 40 }}>
            <h3>Court Argument Generator</h3>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter case issue..."
                style={{ width: "60%" }}
            />

            <button onClick={generate}>Generate Argument</button>

            {script && (
                <div style={{ marginTop: 20 }}>
                    <h4>Oral Argument Script</h4>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {script}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default CourtArgument;