import React from "react";

const ObjectionBox = ({ objections }) => {
    if (!objections || objections.length === 0) return null;

    return (
        <div style={{ border: "2px solid red", padding: 10 }}>
            <h3>⚠️ Objections (Ready to Speak)</h3>

            {objections.map((o: any, i: number) => (
                <div key={i} style={{ marginBottom: 10 }}>
                    <p><b>Opponent:</b> {o.line}</p>

                    <p style={{ color: "red", fontWeight: "bold" }}>
                        👉 Objection, {o.objection}!
                    </p>

                    <p><i>Reason:</i> {o.reason}</p>
                </div>
            ))}
        </div>
    );
};

export default ObjectionBox;