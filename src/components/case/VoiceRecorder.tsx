import React, { useState } from "react";
import axios from "axios";

const VoiceRecorder = ({ caseId }) => {
    const [listening, setListening] = useState(false);
    const [text, setText] = useState("");

    const recognition =
        new (window as any).webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        setText(transcript);
    };

    const start = () => {
        setListening(true);
        recognition.start();
    };

    const stop = async () => {
        recognition.stop();
        setListening(false);

        // 🔥 send to backend
        await axios.post("/api/voice/hearing-notes", {
            transcript: text,
            caseId,
        });

        alert("Notes saved to timeline");
    };

    return (
        <div>
            <h3>🎤 Live Hearing Recorder</h3>

            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>

            <p>{text}</p>
        </div>
    );
};

export default VoiceRecorder;