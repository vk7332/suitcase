import React, { useState } from "react";
import axios from "axios";

const HearingSimulator = () => {
    const [sessionId] = useState(
        () => Math.random().toString(36).slice(2)
    );

    const [facts, setFacts] = useState("");
    const [started, setStarted] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [assist, setAssist] = useState<any>(null);

    const startHearing = async () => {
        const res = await axios.post("/api/hearing/start", {
            sessionId,
            facts,
        });

        setMessages(res.data);
        setStarted(true);
    };

    const send = async () => {
        const res = await axios.post("/api/hearing/respond", {
            sessionId,
            input,
        });

        setMessages((prev) => [
            ...prev,
            { role: "lawyer", content: input },
            { role: "judge", content: res.data.judge },
            { role: "opponent", content: res.data.opponent },
        ]);

        setAssist(res.data);
        setInput("");
    };

    return (
        <div style={{ marginTop: 30 }}>
            <h3>⚖️ Full Hearing Simulator</h3>

            {!started && (
                <>
                    <textarea
                        placeholder="Enter case facts..."
                        value={facts}
                        onChange={(e) => setFacts(e.target.value)}
                        style={{ width: "100%", height: 80 }}
                    />
                    <button onClick={startHearing}>
                        ▶ Start Hearing
                    </button>
                </>
            )}

            {started && (
                <>
                    <div style={{
                        maxHeight: 300,
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        padding: 10
                    }}>
                        {messages.map((m, i) => (
                            <p key={i}>
                                <strong>{m.role.toUpperCase()}:</strong>{" "}
                                {m.content}
                            </p>
                        ))}
                    </div>

                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Your argument..."
                        style={{ width: "70%" }}
                    />

                    <button onClick={send}>Send</button>

                    {/* 🤖 CO-COUNSEL */}
                    {assist && (
                        <div style={{
                            marginTop: 15,
                            background: "#111",
                            color: "#fff",
                            padding: 10
                        }}>
                            <p>💡 <strong>Co-Counsel:</strong> {assist.co_counsel}</p>
                            <p>➡ <strong>Next Hint:</strong> {assist.next_hint}</p>
                            <p>⚠ <strong>Objection Detected:</strong> {assist.objection}</p>
                        </div>
                    )}
                    {/* 🧑‍⚖️ JUDGE FEEDBACK */}
                    {assist && assist.judge_feedback && (
                        <div style={{
                            marginTop: 15,
                            background: "#222",
                            color: "#fff",
                            padding: 10
                        }}>
                            <p>🧑‍⚖️ <strong>Judge Feedback:</strong> {assist.judge_feedback}</p>
                        </div>
                    )}
                    {/* 🔍 OPPONENT ARGUMENT */}
                    {assist && assist.opponent_argument && (
                        <div style={{
                            marginTop: 15,
                            background: "#333",
                            color: "#fff",
                            padding: 10
                        }}>
                            <p>🔍 <strong>Opponent Argument:</strong> {assist.opponent_argument}</p>
                        </div>
                    )}
                    {/* 📄 FINAL DRAFT */
                        { assist && assist.final_draft && (
                            <div style={{
                                marginTop: 15,
                                background: "#444",
                                color: "#fff",
                                padding: 10
                            }}>
                                <p>📄 <strong>Final Draft:</strong> {assist.final_draft}</p>
                            </div>
                        )}
                    {/* 🧑‍⚖️ JUDGE DECISION */}
                    {assist && assist.judge_decision && (
                        <div style={{
                            marginTop: 15,
                            background: "#555",
                            color: "#fff",
                            padding: 10
                        }}>
                            <p>🧑‍⚖️ <strong>Judge Decision:</strong> {assist.judge_decision}</p>
                        </div>
                    )}
                    {/* 🏆 OUTCOME */}
                
            }
                    {assist && assist.outcome && (
                        <div style={{
                            marginTop: 15,
                            background: "#666",
                            color: "#fff",
                            padding: 10
                        }}>
                            <p>🏆 <strong>Outcome:</strong> {assist.outcome}</p>
                        </div>
                    )}
                    {/* 📊 ANALYTICS */}
                    {assist && assist.analytics && (
                        <div style={{
                            marginTop: 15,
                            background: "#777",
                            color: "#fff",
                            padding: 10
                        }}>
                            <p>📊 <strong>Analytics:</strong> {assist.analytics}</p>
                        </div>
                    )}
          )}
                </>
            )}
        </div>
    );
};

export default HearingSimulator;