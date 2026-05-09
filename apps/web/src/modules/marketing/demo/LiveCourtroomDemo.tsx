// 📁 apps/web/src/modules/marketing/demo/LiveCourtroomDemo.tsx

import { useEffect, useMemo, useState } from 'react';

type TranscriptLine = {
    speaker: string;
    text: string;
};

type Suggestion = {
    type: 'suggestion' | 'citation' | 'objection';
    title: string;
    content: string;
};

const transcriptSequence: TranscriptLine[] = [
    {
        speaker: 'Opposing Counsel',
        text: 'The alleged agreement was never executed properly.'
    },
    {
        speaker: 'Judge',
        text: 'Where is the supporting precedent for admissibility?'
    },
    {
        speaker: 'Witness',
        text: 'I do not remember signing the second annexure.'
    },
    {
        speaker: 'You',
        text: 'My lord, the inconsistency directly affects credibility.'
    }
];

const suggestionSequence: Suggestion[] = [
    {
        type: 'suggestion',
        title: '⚡ Suggested Response',
        content:
            'Challenge admissibility under the Evidence Act due to improper execution.'
    },
    {
        type: 'citation',
        title: '📚 Suggested Citation',
        content:
            '(2021) SCC 481 — admissibility principles and attestation requirements discussed.'
    },
    {
        type: 'objection',
        title: '🚨 Possible Contradiction Detected',
        content:
            'Witness statement appears inconsistent with annexure reference.'
    }
];

function TypingText({
    text,
    speed = 18
}: {
    text: string;
    speed?: number;
}) {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        let index = 0;

        setDisplayed('');

        const interval = setInterval(() => {
            index++;

            setDisplayed(text.slice(0, index));

            if (index >= text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{displayed}</span>;
}

function TranscriptPanel({
    transcript
}: {
    transcript: TranscriptLine[];
}) {
    return (
        <div
            style={{
                flex: 1,
                background: '#111827',
                borderRadius: 12,
                padding: 20,
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 420,
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    fontSize: 13,
                    color: '#9CA3AF',
                    marginBottom: 16,
                    letterSpacing: 1
                }}
            >
                🎙️ LIVE TRANSCRIPT
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18
                }}
            >
                {transcript.map((line, index) => (
                    <div key={index}>
                        <div
                            style={{
                                color: '#60A5FA',
                                fontWeight: 600,
                                marginBottom: 4
                            }}
                        >
                            {line.speaker}
                        </div>

                        <div
                            style={{
                                color: '#F3F4F6',
                                lineHeight: 1.6,
                                fontSize: 15
                            }}
                        >
                            <TypingText text={line.text} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SuggestionCard({
    item
}: {
    item: Suggestion;
}) {
    const borderColor = useMemo(() => {
        if (item.type === 'citation') return '#2563EB';
        if (item.type === 'objection') return '#DC2626';

        return '#10B981';
    }, [item.type]);

    return (
        <div
            style={{
                background: '#111827',
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                padding: 16,
                animation: 'fadeSlideIn 0.35s ease',
                boxShadow: '0 6px 24px rgba(0,0,0,0.25)'
            }}
        >
            <div
                style={{
                    color: '#F9FAFB',
                    fontWeight: 700,
                    marginBottom: 10
                }}
            >
                {item.title}
            </div>

            <div
                style={{
                    color: '#D1D5DB',
                    fontSize: 14,
                    lineHeight: 1.7
                }}
            >
                {item.content}
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 14
                }}
            >
                <button style={buttonStyle}>Repeat</button>
                <button style={buttonStyle}>Pin</button>
                <button style={buttonStyle}>Copy</button>
            </div>
        </div>
    );
}

function WhisperPanel({
    suggestions
}: {
    suggestions: Suggestion[];
}) {
    return (
        <div
            style={{
                width: 380,
                display: 'flex',
                flexDirection: 'column',
                gap: 16
            }}
        >
            <div
                style={{
                    background: '#111827',
                    borderRadius: 12,
                    padding: 16,
                    border: '1px solid rgba(255,255,255,0.08)'
                }}
            >
                <div
                    style={{
                        color: '#10B981',
                        fontWeight: 700
                    }}
                >
                    🎧 Whisper Mode Active
                </div>

                <div
                    style={{
                        color: '#9CA3AF',
                        marginTop: 8,
                        fontSize: 13,
                        lineHeight: 1.6
                    }}
                >
                    Low-visibility courtroom assistance enabled.
                </div>
            </div>

            {suggestions.map((s, i) => (
                <SuggestionCard key={i} item={s} />
            ))}

            <div
                style={{
                    background: '#111827',
                    borderRadius: 12,
                    padding: 16,
                    border: '1px solid rgba(255,255,255,0.08)'
                }}
            >
                <div
                    style={{
                        color: '#F9FAFB',
                        fontWeight: 700,
                        marginBottom: 12
                    }}
                >
                    📝 Written Arguments
                </div>

                <div
                    style={{
                        color: '#D1D5DB',
                        fontSize: 14,
                        lineHeight: 1.7,
                        marginBottom: 14
                    }}
                >
                    Generate structured written arguments instantly from live hearing notes and objections.
                </div>

                <button
                    style={{
                        background: '#2563EB',
                        border: 'none',
                        color: '#fff',
                        padding: '10px 14px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Generate Arguments
                </button>
            </div>
        </div>
    );
}

const buttonStyle: React.CSSProperties = {
    background: '#1F2937',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#E5E7EB',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13
};

export default function LiveCourtroomDemo() {
    const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        let transcriptIndex = 0;
        let suggestionIndex = 0;

        setTranscript([]);
        setSuggestions([]);

        const transcriptTimer = setInterval(() => {
            setTranscript(prev => {
                if (transcriptIndex >= transcriptSequence.length) {
                    return prev;
                }

                const next = [
                    ...prev,
                    transcriptSequence[transcriptIndex]
                ];

                transcriptIndex++;

                return next;
            });
        }, 3500);

        const suggestionTimer = setInterval(() => {
            setSuggestions(prev => {
                if (suggestionIndex >= suggestionSequence.length) {
                    return prev;
                }

                const next = [
                    ...prev,
                    suggestionSequence[suggestionIndex]
                ];

                suggestionIndex++;

                return next;
            });
        }, 5000);

        const resetTimer = setTimeout(() => {
            setTranscript([]);
            setSuggestions([]);
        }, 22000);

        return () => {
            clearInterval(transcriptTimer);
            clearInterval(suggestionTimer);
            clearTimeout(resetTimer);
        };
    }, []);

    return (
        <section
            style={{
                background: '#0B1120',
                color: '#fff',
                padding: '80px 20px',
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <style>
                {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 980px) {
            .live-demo-layout {
              flex-direction: column !important;
            }

            .live-demo-right {
              width: 100% !important;
            }
          }
        `}
            </style>

            <div
                style={{
                    maxWidth: 1280,
                    margin: '0 auto'
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: 50
                    }}
                >
                    <div
                        style={{
                            color: '#60A5FA',
                            fontWeight: 700,
                            letterSpacing: 1,
                            marginBottom: 14
                        }}
                    >
                        LIVE COURTROOM ASSISTANCE
                    </div>

                    <h2
                        style={{
                            fontSize: 42,
                            lineHeight: 1.2,
                            margin: 0,
                            marginBottom: 18
                        }}
                    >
                        See How SUITCASE Assists During Live Hearings
                    </h2>

                    <p
                        style={{
                            color: '#9CA3AF',
                            maxWidth: 860,
                            margin: '0 auto',
                            fontSize: 18,
                            lineHeight: 1.8
                        }}
                    >
                        Real-time objections, citation prompts, cross-exam suggestions,
                        and whisper assistance — built specifically for Indian courtrooms.
                    </p>
                </div>

                <div
                    className="live-demo-layout"
                    style={{
                        display: 'flex',
                        gap: 24,
                        alignItems: 'stretch'
                    }}
                >
                    <TranscriptPanel transcript={transcript} />

                    <div className="live-demo-right">
                        <WhisperPanel suggestions={suggestions} />
                    </div>
                </div>

                <div
                    style={{
                        marginTop: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 14,
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={trustBadgeStyle}>
                        ✔ Verified citations only
                    </div>

                    <div style={trustBadgeStyle}>
                        ✔ Courtroom-safe low visibility mode
                    </div>

                    <div style={trustBadgeStyle}>
                        ✔ Built for Indian litigation workflow
                    </div>

                    <div style={trustBadgeStyle}>
                        ✔ Real-time AI courtroom assistance
                    </div>
                </div>

                <div
                    style={{
                        marginTop: 46,
                        textAlign: 'center'
                    }}
                >
                    <button
                        style={{
                            background: '#2563EB',
                            border: 'none',
                            color: '#fff',
                            padding: '16px 28px',
                            borderRadius: 12,
                            cursor: 'pointer',
                            fontSize: 16,
                            fontWeight: 700,
                            boxShadow: '0 8px 28px rgba(37,99,235,0.35)'
                        }}
                    >
                        Start Free Trial
                    </button>

                    <div
                        style={{
                            marginTop: 16,
                            color: '#9CA3AF',
                            fontSize: 14
                        }}
                    >
                        Built for real courtroom pressure.
                    </div>
                </div>
            </div>
        </section>
    );
}

const trustBadgeStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '10px 16px',
    borderRadius: 999,
    color: '#D1D5DB',
    fontSize: 14
};