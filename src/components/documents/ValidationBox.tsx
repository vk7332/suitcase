import React from "react";

const ValidationBox = ({ validation }: any) => {
    if (!validation) return null;

    return (
        <div style={{ border: "1px solid #ccc", padding: 12, marginTop: 10 }}>
            <h3>Pleading Validation</h3>

            {validation.isValid ? (
                <p style={{ color: "green" }}>✔ All sections present</p>
            ) : (
                <>
                    {validation.warnings.map((w: string, i: number) => (
                        <p key={i} style={{ color: "red" }}>
                            ⚠ {w}
                        </p>
                    ))}
                </>
            )}
        </div>
    );
};

export default ValidationBox;
