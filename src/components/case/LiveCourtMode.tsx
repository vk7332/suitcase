import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveCourtMode = () => {
    const [input, setInput] = useState("");
    const [whisper, setWhisper] = useState("");

    // ⏱️ Fast debounce (1 sec)
    useEffect(() => {
        const t = setTimeout(async () => {
            if (!input) return;

            const res = await axios.post("/api/live-whisper", {
                text: input,
            });

            setWhisper(
                `${res.data.whisper || ""} ${res.data.case || ""}`
            );
        }, 1000);

        return () => clearTimeout(t);
    }, [input]);

    return (
        <div>
            {/* Hidden input (can be voice-fed) */}
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ opacity: 0, position: "absolute" }}
            />

            {/* Whisper overlay */}
            <div
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    background: "rgba(0,0,0,0.7)",
                    color: "#0f0",
                    padding: "8px 12px",
                    borderRadius: 6,
                    fontSize: 12,
                    maxWidth: 250,
                }}
            >
                🎧 {whisper}
            </div>
        </div>
    );
};

export default LiveCourtMode;
