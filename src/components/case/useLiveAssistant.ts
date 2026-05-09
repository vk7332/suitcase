import { useEffect, useState } from "react";
import { useHaptics } from "./useHaptics";
import { useRef } from "react";
import { useSpeech } from "./useSpeech";
import { usePriorityQueue } from "./usePriorityQueue";

export const useLiveAssistant = (
    data,
    silentMode = false,
    hapticEnabled = false,
    audioEnabled = false
) => {
    const lastVibrationRef = useRef(0);
    const [suggestion, setSuggestion] = useState("");
    const [queue, setQueue] = useState([]);
    // 📳 SAFE THROTTLED VIBRATION
    const now = Date.now();

    const { vibrate } = useHaptics();

    const { speak } = useSpeech();

    const { rankSuggestions } = usePriorityQueue();
    const ranked = rankSuggestions(data);

    if (ranked.length > 0) {
        setSuggestion(ranked[0].text);
        setQueue(ranked);
    }

    useEffect(() => {
        if (!data || silentMode) return;

        let newSuggestion = "";
        let vibrationPattern: number | number[] = 50;

        // 🎯 PRIORITY-BASED HAPTICS

        if (data.objections?.objections?.length > 0) {
            newSuggestion = `Objection, ${data.objections.objections[0].objection}!`;

            // 🔴 Strong alert (but still subtle)
            vibrationPattern = [30, 40, 30];
        } else if (data.contradictions?.contradictions?.length > 0) {
            newSuggestion = "⚠️ Opponent contradiction detected";

            // 🟡 Medium alert
            vibrationPattern = 40;
        } else if (data.crossExam?.questions?.length > 0) {
            newSuggestion = `Ask: ${data.crossExam.questions[0]}`;

            // 🔵 Light alert
            vibrationPattern = 20;
        }

        if (newSuggestion) {
            setSuggestion(newSuggestion);

            if (
                hapticEnabled &&
                now - lastVibrationRef.current > 3000 // 3 sec gap
            ) {
                vibrate(vibrationPattern);
                lastVibrationRef.current = now;
            }
            if (newSuggestion) {
                speak(newSuggestion);
            }

            // 🎧 AUDIO WHISPER (ONLY IF ENABLED)
            if (audioEnabled && !silentMode) {
                speak(newSuggestion);
            }

            if (newSuggestion.length > 120) return;
            if (!newSuggestion.toLowerCase().includes("objection")) {
                // skip audio for low priority
            } else {
                speak(newSuggestion);
            }

            // 🔐 AUTO-HIDE
            setTimeout(() => {
                setSuggestion("");
            }, 5000);
        }
    }, [data, silentMode, hapticEnabled, audioEnabled]);

    return { suggestion, setSuggestion, queue, setQueue };
};