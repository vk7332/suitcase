export const useSpeech = () => {
    const speak = (text: string) => {
        if (!("speechSynthesis" in window)) return;

        const msg = new SpeechSynthesisUtterance(text);

        // 🎧 Whisper-like settings
        msg.volume = 0.5;   // not loud
        msg.rate = 1;       // natural speed
        msg.pitch = 1;

        // optional: choose voice
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            msg.voice = voices[0];
        }

        window.speechSynthesis.cancel(); // stop previous
        window.speechSynthesis.speak(msg);
    };

    return { speak };
};
