import { useEffect, useState, useRef } from "react";
import { useHaptics } from "./use-haptics";
import { useSpeech } from "./use-speech";
import { usePriorityQueue } from "./use-priority-queue";

export const useLiveAssistant = (
    data: any,
    silentMode = false,
    hapticEnabled = false,
    audioEnabled = false
) => {
    const lastVibrationRef = useRef(0);
    const [suggestion, setSuggestion] = useState("");
    const [queue, setQueue] = useState<any[]>([]);
    
    const { vibrate } = useHaptics();
    const { speak } = useSpeech();
    const { rankSuggestions } = usePriorityQueue();

    useEffect(() => {
        if (!data) return;
        const ranked = rankSuggestions(data);
        if (ranked.length > 0) {
            setQueue(ranked);
        }
    }, [data, rankSuggestions]);

    useEffect(() => {
        if (!data || silentMode) return;

        let newSuggestion = "";
        let vibrationPattern: number | number[] = 50;
        const now = Date.now();

        // 🎯 PRIORITY-BASED HAPTICS
        if (data.objections?.objections?.length > 0) {
            newSuggestion = `Objection, ${data.objections.objections[0].objection}!`;
            vibrationPattern = [30, 40, 30];
        } else if (data.contradictions?.contradictions?.length > 0) {
            newSuggestion = "⚠️ Opponent contradiction detected";
            vibrationPattern = 40;
        } else if (data.crossExam?.questions?.length > 0) {
            newSuggestion = `Ask: ${data.crossExam.questions[0]}`;
            vibrationPattern = 20;
        }

        if (newSuggestion) {
            setSuggestion(newSuggestion);

            if (hapticEnabled && now - lastVibrationRef.current > 3000) {
                vibrate(vibrationPattern);
                lastVibrationRef.current = now;
            }

            if (audioEnabled) {
                speak(newSuggestion);
            }

            // 🔐 AUTO-HIDE
            const timer = setTimeout(() => {
                setSuggestion("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [data, silentMode, hapticEnabled, audioEnabled, vibrate, speak]);

    return { suggestion, setSuggestion, queue, setQueue };
};
