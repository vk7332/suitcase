import React, { useEffect, useState } from "react";
import axios from "axios";

const ObjectionAlert = ({ opponentText }) => {
    const [alert, setAlert] = useState<any>(null);

    useEffect(() => {
        if (!opponentText) return;

        const t = setTimeout(async () => {
            const res = await axios.post("/api/detect-objection", {
                text: opponentText,
            });

            setAlert(res.data);
        }, 1200);

        return () => clearTimeout(t);
    }, [opponentText]);

    if (!alert) return null;

    return (
        <div
            style={{
                position: "fixed",
                left: 20,
                bottom: 20,
                background: "#300",
                color: "#fff",
                padding: 10,
                borderRadius: 6,
                maxWidth: 300,
            }}
        >
            <p>⚠ {alert.issue}</p>
            <p>🛑 {alert.objection}</p>
            <p>💬 "{alert.line}"</p>
        </div>
    );
};

export default ObjectionAlert;
