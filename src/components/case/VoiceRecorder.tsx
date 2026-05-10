import { useState, useEffect } from "react";
import axios from "axios";

const VoiceRecorder = ({ caseId }: { caseId: string }) => {
    const [listening, setListening] = useState(false);
    const [text, setText] = useState("");

    const [recognition] = useState(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        return rec;
    });

    useEffect(() => {
        (recognition as any).onresult = (event: any) => {
            const transcript = Array.from(event.results as any)
                .map((result: any) => result[0].transcript)
                .join("");
            setText(transcript);
        };
    }, [recognition]);

    const start = () => {
        (recognition as any).start();
        setListening(true);
    };

    const stop = async () => {
        (recognition as any).stop();
        setListening(false);

        try {
            // 🔥 send to backend
            await axios.post("/api/voice/hearing-notes", {
                transcript: text,
                caseId,
            });
            alert("Notes saved to timeline");
        } catch (e) {
            console.error("Failed to save hearing notes", e);
            alert("Failed to save notes");
        }
    };

    return (
        <div>
            <h3>🎤 Live Hearing Recorder</h3>

            <button onClick={start}>{listening ? "🔴 Listening..." : "🎙 Start Recording"}</button>
            <button onClick={stop}>Stop</button>

            <p>{text}</p>
        </div>
    );
};

export default VoiceRecorder;
