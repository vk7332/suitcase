import { useState } from 'react';

export function useAudioInput(onTranscript: (text: string) => void) {
    const [listening, setListening] = useState(false);

    async function start() {
        setListening(true);

        // Fake transcription for now
        setTimeout(() => {
            onTranscript("Objection, leading question");
        }, 1500);
    }

    function stop() {
        setListening(false);
    }

    return { start, stop, listening };
}