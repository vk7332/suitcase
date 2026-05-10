import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Mock helper for history - should ideally be an API call
const addToHistory = async (caseId: string, entry: string) => {
    try {
        await axios.post("/api/history", { caseId, entry });
    } catch (e) {
        console.error("Failed to add to history", e);
    }
};

const VoiceAssistant = ({ caseId }: { caseId: string }) => {
    const [listening, setListening] = useState(false);
    const [text, setText] = useState("");
    const [alert, setAlert] = useState("");
    const [objection, setObjection] = useState("");

    const [silentMode, setSilentMode] = useState(true);
    const [earpieceMode, setEarpieceMode] = useState(false);
    const recognitionRef = useRef<any>(null);
    const [followUp, setFollowUp] = useState("");
    const [crossExam, setCrossExam] = useState<any>(null);
    const [strategy, setStrategy] = useState<any>(null);
    const [timing, setTiming] = useState<any>(null);
    const [weakness, setWeakness] = useState<any>(null);
    const [win, setWin] = useState<any>(null);
    const [judgeMood, setJudgeMood] = useState<any>(null);
    const [confidence, setConfidence] = useState<number | null>(null);
    const [blocked, setBlocked] = useState<boolean>(false);

    const speak = useCallback((msg: string) => {
        if (silentMode) return;

        let speechText = msg;

        if (earpieceMode) {
            speechText = msg.split(",")[0]; // shorter whisper
        }

        const utter = new SpeechSynthesisUtterance(speechText);
        utter.volume = earpieceMode ? 0.1 : 0.3;
        utter.rate = 1.05;

        speechSynthesis.speak(utter);
        
        addToHistory(caseId, `assistant: ${speechText}`);
    }, [caseId, silentMode, earpieceMode]);

    const processSpeech = useCallback(async (speech: string) => {
        try {
            const res = await axios.post("/api/co-counsel", {
                text: speech,
                caseId,
                role: "opponent",
            });

            const coCounselData = res.data;
            setAlert(coCounselData.contradiction || "");
            setObjection(coCounselData.objectionLine || "");
            setFollowUp(coCounselData.followUp || "");
            setCrossExam(coCounselData.crossExamChain || null);
            setStrategy(coCounselData.strategy || null);
            setTiming(coCounselData.timing || null);
            setWeakness(coCounselData.weakness || null);
            setWin(coCounselData.win || null);
            setJudgeMood(coCounselData.judgeMood || null);
            setConfidence(coCounselData.confidence || null);
            setBlocked(coCounselData.blocked || false);

            if (coCounselData.objectionLine) {
                speak(coCounselData.objectionLine);
            }

            if (earpieceMode && coCounselData.timing?.decision === "INTERRUPT_NOW") {
                speak("Interrupt now");
            }

            if (earpieceMode && coCounselData.weakness?.level === "WEAK") {
                speak("Weak point. Attack now.");
            }

            if (earpieceMode && coCounselData.judgeMood?.mood === "IMPATIENT") {
                speak("Be brief.");
            }

            if (earpieceMode && coCounselData.win?.status === "RISKY") {
                speak("Avoid aggressive argument.");
            }
        } catch (e) {
            console.error("Error processing speech", e);
        }
    }, [caseId, earpieceMode, speak]);

    useEffect(() => {
        const SpeechRecognition =
            (window as any).webkitSpeechRecognition ||
            (window as any).SpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech Recognition API not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-IN";

        recognition.onresult = (event: any) => {
            const transcript =
                event.results[event.results.length - 1][0].transcript;

            setText(transcript);
            processSpeech(transcript);
        };

        recognitionRef.current = recognition;

        // start hearing session
        axios.post("/api/start-hearing", { caseId }).catch(console.error);
    }, [caseId, processSpeech]);

    const start = () => {
        recognitionRef.current?.start();
        setListening(true);
    };

    const stop = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h3>🎤 Court Voice Assistant</h3>

            <div>
                <button onClick={start} disabled={listening}>
                    🎙 Start
                </button>
                <button onClick={stop} disabled={!listening}>
                    ⏹ Stop
                </button>
            </div>

            <div style={{ marginTop: 10 }}>
                <label>
                    <input
                        type="checkbox"
                        checked={silentMode}
                        onChange={() => setSilentMode(!silentMode)}
                    />
                    🔇 Silent Mode
                </label>

                <label style={{ marginLeft: 10 }}>
                    <input
                        type="checkbox"
                        checked={earpieceMode}
                        onChange={() => setEarpieceMode(!earpieceMode)}
                    />
                    🎧 Earpiece Mode
                </label>

                <label style={{ marginLeft: 10 }}>
                    <input
                        type="checkbox"
                        checked={blocked}
                        disabled
                    />
                    🚫 Blocked
                </label>
            </div>

            {confidence !== null && (
                <div style={{ marginTop: 10 }}>
                    Confidence Score: {confidence}%
                </div>
            )}

            <div style={{ marginTop: 15 }}>
                <p><strong>Opponent:</strong> {text}</p>

                {alert && (
                    <div style={{
                        background: "#ffe6e6",
                        padding: 10,
                        border: "1px solid red"
                    }}>
                        ⚠ {alert}
                    </div>
                )}

                {objection && (
                    <div style={{
                        background: "#e6f0ff",
                        padding: 10,
                        marginTop: 10,
                        border: "1px solid #007bff"
                    }}>
                        🗣 <strong>Say:</strong> {objection}
                    </div>
                )}

                {followUp && (
                    <div style={{
                        background: "#fff3cd",
                        padding: 10,
                        marginTop: 10,
                        border: "1px solid #ffc107"
                    }}>
                        ❓ <strong>Ask:</strong> {followUp}
                    </div>
                )}

                {crossExam && (
                    <div style={{
                        background: "#d1e7dd",
                        padding: 10,
                        marginTop: 10,
                        border: "1px solid #0f5132"
                    }}>
                        🔍 <strong>Cross-Examination Points:</strong>
                        <ul>
                            {crossExam.map((point: string, idx: number) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {strategy && (
                    <div style={{ marginTop: 10 }}>
                        💡 <strong>Strategy:</strong> {strategy.description}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceAssistant;
