import React, { useState, CSSProperties } from "react";
import { useClipboard } from "./useClipboard";

const WhisperBox = ({ suggestion, onAccept, onIgnore, onSave }) => {
    const { copy } = useClipboard();

    if (!suggestion) return null;

    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        const textToCopy = suggestion.startsWith("Objection")
            ? suggestion
            : `Objection, ${suggestion}`;

        const success = await copy(textToCopy);

        if (success) {
            // 🧠 AUTO-SAVE
            onSave?.(textToCopy);
        }
    };

    const isCritical = suggestion?.toLowerCase().includes("objection");
    return (
        <div style={styles.box}>
            <p style={styles.text}>⚖️ {suggestion}</p>

            <div style={styles.actions}>
                <button onClick={handleCopy} style={styles.copy}>
                    📋
                </button>

                <button onClick={onAccept} style={styles.accept}>
                    ✔
                </button>

                <button onClick={onIgnore} style={styles.ignore}>
                    ✖
                </button>

                <button>
                    {copied ? "✅" : "📋"}
                </button>

                <button onClick={onPin}>
                    {pinned ? "📌 Unpin" : "📌 Pin"}
                </button>
            </div>
        </div>
    );
};

const styles: Record<string, CSSProperties> = {
    box: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        maxWidth: "280px",
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: "10px",
        fontSize: "13px",
        zIndex: 9999,

        // 💡 FADE ANIMATION
        opacity: 1,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        transform: "translateY(0)",
        border: isCritical ? "2px solid red" : "1px solid #444",
        animation: isCritical ? "pulse 0.8s ease-in-out 2" : "none",
    },
    text: {
        margin: 0,
        marginBottom: "6px",
    },
    actions: {
        display: "flex",
        gap: "8px",
    },
    accept: {
        background: "green",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    ignore: {
        background: "red",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    copy: {
        background: "blue",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    }
};

export default WhisperBox;