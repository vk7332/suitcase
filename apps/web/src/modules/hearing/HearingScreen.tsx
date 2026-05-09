import { useState } from 'react';
import { useAISuggestions } from '../ai/useAISuggestions';
import { useAudioInput } from '../audio/useAudioInput';

export default function HearingScreen() {
    const sessionId = "demo-session";

    const { suggestions, request } = useAISuggestions(sessionId);

    const { start, listening } = useAudioInput((text) => {
        request(text);
    });

    return (
        <div>
            <h1>Hearing Mode</h1>

            <button onClick={start}>
                {listening ? 'Listening...' : 'Start Voice'}
            </button>

            <div>
                <h3>Suggestions:</h3>
                {suggestions.map((s, i) => (
                    <div key={i}>{s}</div>
                ))}
            </div>
        </div>
    );
}