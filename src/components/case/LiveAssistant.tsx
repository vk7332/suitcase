import React, { useState, useEffect } from "react";
import axios from "axios";
import WhisperBox from "./WhisperBox";
import { useLiveAssistant } from "./useLiveAssistant";
import { useSpeech } from "./useSpeech";
import { useNotes } from "./useNotes";
import NotesPanel from "./NotesPanel";
import SuggestionList from "./SuggestionList";
import { useClipboard } from "./useClipboard";

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

const LiveAssistant = ({ liveData }: { liveData: any }) => {
    const { speak } = useSpeech();
    const [silentMode, setSilentMode] = useState(false);
    const { notes, addNote, clearNotes } = useNotes();
    const { copy } = useClipboard();

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
        setSuggestion("");
    };

    // ❌ IGNORE
    const handleIgnore = () => {
        console.log("Ignored:", suggestion);
        setSuggestion("");
    };

    const handleRepeat = () => {
        if (!lastSuggestion) return;
        setSuggestion(lastSuggestion);
        if (audioEnabled) {
            speak(lastSuggestion);
        }
    };

    return (
        <div style={styles.panel}>
            {suggestion && (
                <div style={styles.arguments}>
                    <p>{suggestion}</p>
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleAccept} className="bg-green-500 text-white px-2 py-1 rounded">Accept</button>
                        <button onClick={handleIgnore} className="bg-red-500 text-white px-2 py-1 rounded">Ignore</button>
                    </div>
                </div>
            )}
            
            <button 
                onClick={handleRepeat}
                className="bg-blue-600 text-white p-2 rounded-full shadow-lg"
                title="Repeat Last Suggestion"
            >
                🔄
            </button>

            <NotesPanel notes={notes} onClear={clearNotes} />
        </div>
    );
};

export default LiveAssistant;
