import React from "react";

interface Signer {
    id: string;
    role: string;
    status: string;
    user_name?: string;
    signed_at?: string;
}

const SignersList: React.FC<{ signers: Signer[] }> = ({ signers }) => {
    return (
        <div>
            <h3>Signing Workflow</h3>

            {signers.map((s, index) => (
                <div key={s.id} style={{ marginBottom: "10px" }}>
                    <strong>{index + 1}. {s.role.toUpperCase()}</strong>

                    <div>
                        Status:{" "}
                        {s.status === "signed" ? "✅ Signed" : "⏳ Pending"}
                    </div>

                    {s.signed_at && (
                        <div>
                            Signed At: {new Date(s.signed_at).toLocaleString()}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SignersList;
