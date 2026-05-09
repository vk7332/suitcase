import React, { useState, useEffect } from "react";
import axio from "axios";
import WhisperBox from "./WhisperBox";
import { useLiveAssistant } from "./useLiveAssistant";
import { useSpeech } from "./useSpeech";
import { useNotes } from "./useNotes";
import NotesPanel from "./NotesPanel";
import SuggestionList from "./SuggestionList";
import { useClipboard } from "./useClipboard";
import list from "../../pages/case/list";

const { speak } = useSpeech();

const styles: { panel: React.CSSProperties; arguments: React.CSSProperties } = {
    panel: {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        display: "flex",
        gap: "6px",
        zIndex: 9999,
    },
    arguments: {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "320px",
        maxHeight: "300px",
        overflow: "auto",
        background: "#fff",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "12px",
    },
};

const LiveAssistant = ({ liveData }) => {
    const [silentMode, setSilentMode] = useState(false);
    const { notes, addNote, clearNotes } = useNotes();

    // 🔐 SAFE DEFAULT
    const [hapticEnabled, setHapticEnabled] = useState(false);

    // 🔐 OPTIONAL (for audio later)
    const [audioEnabled, setAudioEnabled] = useState(false);

    const { suggestion, setSuggestion } = useLiveAssistant(
        liveData,
        silentMode,
        hapticEnabled,
        audioEnabled
    );

    const [lastSuggestion, setLastSuggestion] = useState("");
    useEffect(() => {
        if (suggestion) {
            setLastSuggestion(suggestion);
        }
    }, [suggestion]);

    // ✅ ACCEPT (user uses suggestion)
    const handleAccept = () => {
        console.log("Accepted:", suggestion);

        // optional: log to backend
        // axios.post("/api/log", { type: "ACCEPT", suggestion });

        setSuggestion("");
    };

    // ❌ IGNORE
    const handleIgnore = () => {
        console.log("Ignored:", suggestion);
        setSuggestion("");
    };

    const handleRepeat = () => {
        if (!lastSuggestion) return;

        // show again
        setSuggestion(lastSuggestion);

        // optional audio replay
        if (audioEnabled) {
            speak(lastSuggestion);
        }
        if (lastSuggestion.length > 120) return;
        if (!lastSuggestion.toLowerCase().includes("objection")) {
            // skip audio for low priority
        } else {
            speak(lastSuggestion);
        }
        if (notes.includes(text)) return;
        addNote(text);
        if (notes.length > 50) return;
        // 🔐 AUTO-SAVE
        addNote(lastSuggestion);
        if (text.length > 150) return;
        if (text.toLowerCase().includes("objection")) {
            speak(text);
        }
        if (notes.length < 2) return;
        "Use only the provided notes. Do not assume new facts."
        "Limit to 500–700 words."
        "Write in a persuasive tone, using rhetorical devices and legal jargon."
        "Format as a formal legal argument, suitable for court submission."
        "Focus on the strongest points and avoid repetition."
        speak(text);
        if (text.length > 150) return;
        if (!text.toLowerCase().includes("objection")) {
            // skip audio for low priority
        } else {
            speak(text);
        }

        if (text.length > 150) return;
        if (text.toLowerCase().includes("objection")) {
            speak(text);
        }

        if (notes.length > 50) return;
        // 🔐 AUTO-SAVE
        addNote(lastSuggestion);

        if (text.length > 150) return;
        if (text.toLowerCase().includes("objection")) {
            speak(text);
        }
        if (ranked[0]?.text === suggestion) return;

        // 🔐 AUTO-HIDE
        setTimeout(() => {
            setSuggestion("");
        }, 5000);
        return list.slice(0, 3);
    };

    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        const textToCopy = suggestion.startsWith("Objection")
            ? suggestion
            : `Objection, ${suggestion}`;
        const success = await copy(textToCopy);

        if (success) {
            // 🧠 AUTO-SAVE
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const exportNotes = () => {
        const content = `
FINAL ARGUMENT NOTES

${notes.map((n, i) => `${i + 1}. ${n}`).join("\n")}
`;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "arguments.txt";
        a.click();
    };

    const [generatedArgs, setGeneratedArgs] = useState("");
    const generateArguments = async () => {
        if (!notes.length) return;

        const res = await axios.post("/api/arguments/generate", {
            notes,
        });

        setGeneratedArgs(res.data.content);
    };

    const downloadPdf = async () => {
        const res = await axios.post(
            "/api/pdf/arguments-pdf",
            { content: generatedArgs },
            { responseType: "blob" }
        );

        const url = URL.createObjectURL(res.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = "arguments.pdf";
        a.click();
    };

    return (
        <>
            <WhisperBox
                suggestion={suggestion}
                onAccept={handleAccept}
                onIgnore={handleIgnore}
                onSave={addNote}
            />

            <SuggestionList
                queue={queue}
                onSelect={(text) => setSuggestion(text)}
            />

            <NotesPanel notes={notes} onClear={clearNotes} />

            {generatedArgs && (
                <div style={styles.arguments}>
                    <h3>📄 Written Arguments</h3>
                    <pre>{generatedArgs}</pre>
                </div>
            )}

            {/* 🎛️ CONTROL PANEL */}
            <div style={styles.panel}>
                <button onClick={() => setSilentMode(!silentMode)}>
                    🔇
                </button>

                <button onClick={() => setHapticEnabled(!hapticEnabled)}>
                    📳
                </button>

                <button onClick={() => setAudioEnabled(!audioEnabled)}>
                    🎧
                </button>

                <button onClick={handleRepeat}>
                    🔁
                </button>

                <button onClick={exportNotes}>
                    📄 Export
                </button>

                <button onClick={generateArguments}>
                    ⚖️ Generate Arguments
                </button>
                <button onClick={downloadPdf}>
                    📄 Download PDF
                </button>
            </div>
        </>
    );
};

export default LiveAssistant;