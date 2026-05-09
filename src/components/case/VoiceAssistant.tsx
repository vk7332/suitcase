import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { addToHistory } from "../../../server/services/memory.service";

const VoiceAssistant = ({ caseId }) => {
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

    useEffect(() => {
        const SpeechRecognition =
            (window as any).webkitSpeechRecognition ||
            (window as any).SpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition API not supported in this browser.");
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
        axios.post("/api/start-hearing", { caseId });
    }, []);

    const start = () => {
        recognitionRef.current?.start();
        setListening(true);
    };

    const stop = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    const processSpeech = async (speech: string) => {
        try {
            await axios.post("/api/co-counsel", {
                text: speech,
                caseId,
                role: "opponent",
            });

            setAlert(res.data.contradiction || "");
            setObjection(res.data.objectionLine || "");
            setFollowUp(res.data.followUp || "");
            setCrossExam(res.data.crossExamChain || null);
            setStrategy(res.data.strategy || null);
            setTiming(res.data.timing || null);
            setWeakness(res.data.weakness || null);
            setWin(res.data.winProbability || null);
            setJudgeMood(res.data.judgeMood || null);
            setConfidence(res.data.confidence || null);
            setBlocked(res.data.blocked || false);

            if (res.data.objectionLine) {
                speak(res.data.objectionLine);
            }
        } catch {
            console.log("Error");
        }
    };

    const speak = (msg: string) => {
        speak(crossExam.q1);
        speak(crossExam.q2);
        if (silentMode) return;
        if (!contradiction && !objectionLine) return null;
        if (memory.history.includes(followUp)) return null;
        if (result.blocked && !override) return;

        let text = msg;

        if (earpieceMode) {
            text = msg.split(",")[0]; // shorter whisper
        }

        if (earpieceMode && followUp) {
            speak(followUp);
        }

        const utter = new SpeechSynthesisUtterance(text);
        utter.volume = earpieceMode ? 0.1 : 0.3;
        utter.rate = 1.05;

        speechSynthesis.speak(utter);
        // if (followUp) {
        //     setTimeout(() => speak(followUp), 3000);
        // }

        setTimeout(() => {
            if (followUp) speak(followUp);
        }, 3000);

        if (earpieceMode && timing?.decision === "INTERRUPT_NOW") {
            speak("Interrupt now");
        }

        if (earpieceMode && weakness?.level === "WEAK") {
            speak("Weak point. Attack now.");
        }

        if (earpieceMode && judgeMood?.mood === "IMPATIENT") {
            speak("Be brief.");
        }

        if (earpieceMode && win?.status === "RISKY") {
            speak("Avoid aggressive argument.");
        }

        addToHistory(caseId, `assistant: ${text}`);
    };

    export const analyzeContradictions = async (
        opponentLines: string[]
    ) => {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: `Identify contradictions in the following statements by the opponent: ${opponentLines.join(", ")}` }
            ]
        });

        return completion.choices[0].message;
    };

    const speak = (text: string) => {
        const msg = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(msg);
        speak(`Objection, ${o.objection}`);
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
                    <div style={{
                        background: "#eef",
                        padding: 10,
                        marginTop: 10,
                        border: "1px solid #333"
                    }}>
                        ⚖️ <strong>Strategy:</strong> {strategy.action}
                        <br />
                        <small>{strategy.reason}</small>
                    </div>
                )}

                {timing && (
                    <div style={{
                        background: "#f5f5f5",
                        padding: 10,
                        marginTop: 10,
                        border: "1px solid #999"
                    }}>
                        ⏱ <strong>Timing:</strong> {timing.decision}
                        <br />
                        <small>{timing.reason}</small>
                    </div>
                )}

                {weakness && (
                    <div style={{
                        marginTop: 10,
                        padding: 10,
                        border: "1px solid #ccc",
                        background: "#fafafa"
                    }}>
                        <strong>📊 Opponent Strength</strong>

                        <div style={{
                            height: 10,
                            width: "100%",
                            background: "#ddd",
                            marginTop: 5
                        }}>
                            <div style={{
                                width: `${weakness.score}%`,
                                height: "100%",
                                background:
                                    weakness.level === "WEAK"
                                        ? "red"
                                        : weakness.level === "MEDIUM"
                                            ? "orange"
                                            : "green"
                            }} />
                        </div>

                        <p>
                            {weakness.level} ({weakness.score}/100)
                        </p>

                        {weakness.reason && (
                            <small>{weakness.reason}</small>
                        )}
                    </div>
                )}

                {win && (
                    <div style={{
                        marginTop: 10,
                        padding: 10,
                        background: "#eef"
                    }}>
                        ⚖️ <strong>Win Probability</strong>

                        <div style={{ height: 10, background: "#ccc" }}>
                            <div style={{
                                width: `${win.probability}%`,
                                height: "100%",
                                background:
                                    win.status === "FAVORABLE"
                                        ? "green"
                                        : win.status === "BALANCED"
                                            ? "orange"
                                            : "red"
                            }} />
                        </div>

                        <p>{win.status} ({win.probability}%)</p>
                    </div>
                )}

                {judgeMood && (
                    <div style={{
                        marginTop: 10,
                        padding: 10,
                        background: "#fff4e6"
                    }}>
                        🧑‍⚖️ Judge Mood: <strong>{judgeMood.mood}</strong>
                    </div>
                )}

                {confidence !== null && (
                    <div style={{
                        marginTop: 10,
                        padding: 10,
                        background: "#e6f7ff"
                    }}>
                        📈 Confidence Level: <strong>{confidence}%</strong>
                    </div>
                )}
                <div style={{ marginTop: 10 }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={silentMode}
                            onChange={() => setSilentMode(!silentMode)}
                        />
                        🔇 Silent Mode
                    </label>
                </div>
            </div>

            {result?.complianceWarnings?.length > 0 && (
                <div style={{
                    background: "#ffe6e6",
                    padding: 10,
                    marginTop: 10,
                    border: "1px solid red"
                }}>
                    ⚖️ <strong>Compliance Warnings</strong>
                    {result.complianceWarnings.map((w, i) => (
                        <p key={i}>⚠ {w}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VoiceAssistant;