import React, { useState, CSSProperties } from "react";
import { useClipboard } from "./use-clipboard";

interface WhisperBoxProps {
    suggestion: string;
    onAccept?: () => void;
    onIgnore?: () => void;
    onSave?: (text: string) => void;
}

const WhisperBox = ({ suggestion, onAccept, onIgnore, onSave }: WhisperBoxProps) => {
    const { copy } = useClipboard();
    const [pinned, setPinned] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!suggestion) return null;

    const handleCopy = async () => {
        const textToCopy = suggestion.startsWith("Objection")
            ? suggestion
            : `Objection, ${suggestion}`;

        const success = await copy(textToCopy);

        if (success) {
            setCopied(true);
            onSave?.(textToCopy);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const isCritical = suggestion?.toLowerCase().includes("objection");

    const dynamicBoxStyle: CSSProperties = {
        ...styles.box,
        border: isCritical ? "2px solid red" : "1px solid #444",
        animation: isCritical ? "pulse 0.8s ease-in-out 2" : "none",
    };

    return (
        <div style={dynamicBoxStyle}>
            <p style={styles.text}>⚖️ {suggestion}</p>

            <div style={styles.actions}>
                <button onClick={handleCopy} style={styles.copy} title="Copy Objection">
                    {copied ? "✅" : "📋"}
                </button>

                <button onClick={onAccept} style={styles.accept} title="Accept">
                    ✔
                </button>

                <button onClick={onIgnore} style={styles.ignore} title="Ignore">
                    ✖
                </button>

                <button onClick={() => setPinned(!pinned)} title={pinned ? "Unpin" : "Pin"}>
                    {pinned ? "📍" : "📌"}
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
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        padding: "12px 16px",
        borderRadius: "12px",
        fontSize: "14px",
        zIndex: 9999,
        opacity: 1,
        transition: "all 0.3s ease",
        transform: "translateY(0)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },
    text: {
        margin: 0,
        marginBottom: "10px",
        lineHeight: "1.4",
    },
    actions: {
        display: "flex",
        gap: "10px",
    },
    accept: {
        background: "#22c55e",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        padding: "4px 8px",
    },
    ignore: {
        background: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        padding: "4px 8px",
    },
    copy: {
        background: "#3b82f6",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        padding: "4px 8px",
    },
};

export default WhisperBox;
