import { useRef, useState } from "react";

type SuggestionType = "objection" | "contradiction" | "question";

type Suggestion = {
    text: string;
    type: SuggestionType;
    score: number;
    confidence: number;
    risk: "low" | "medium" | "high";
};

const CONFIDENCE_THRESHOLD = 0.7;
const COOLDOWN_MS = 3000;
const LOCK_DURATION_MS = 7000;

export const usePriorityQueue = () => {
    const lastShownRef = useRef<string>("");
    const lastTimeRef = useRef<number>(0);

    const [locked, setLocked] = useState(false);

    // 🔹 Confidence logic
    const getConfidence = (type: SuggestionType, data: any): number => {
        if (type === "objection") {
            return data?.objections?.confidence ?? 0.9;
        }
        if (type === "contradiction") {
            return data?.contradictions?.confidence ?? 0.75;
        }
        return 0.6;
    };

    // 🔹 Risk logic
    const getRisk = (type: SuggestionType): "low" | "medium" | "high" => {
        if (type === "objection") return "low";
        if (type === "contradiction") return "medium";
        return "medium";
    };

    // 🔹 Build suggestion list
    const buildSuggestions = (data: any): Suggestion[] => {
        const list: Suggestion[] = [];

        // 🔴 Objection (highest priority)
        if (data?.objections?.objections?.length > 0) {
            const objection = data.objections.objections[0]?.objection;

            if (objection) {
                list.push({
                    text: `Objection, ${objection}!`,
                    type: "objection",
                    score: 100,
                    confidence: getConfidence("objection", data),
                    risk: getRisk("objection"),
                });
            }
        }

        // 🟡 Contradiction
        if (data?.contradictions?.contradictions?.length > 0) {
            list.push({
                text: "⚠️ Opponent statement contradicts earlier position",
                type: "contradiction",
                score: 70,
                confidence: getConfidence("contradiction", data),
                risk: getRisk("contradiction"),
            });
        }

        // 🔵 Cross-question
        if (data?.crossExam?.questions?.length > 0) {
            const q = data.crossExam.questions[0];
            if (q) {
                list.push({
                    text: `Ask: ${q}`,
                    type: "question",
                    score: 50,
                    confidence: getConfidence("question", data),
                    risk: getRisk("question"),
                });
            }
        }

        return list;
    };

    // 🔹 Main ranking function
    const rankSuggestions = (data: any): Suggestion[] => {
        const now = Date.now();

        // 🔒 Context lock (prevent rapid switching)
        if (locked) return [];

        const list = buildSuggestions(data);

        // 🔐 Confidence filter
        const filtered = list.filter(
            (s) => s.confidence >= CONFIDENCE_THRESHOLD
        );

        // 🔽 Sort by priority
        const sorted = filtered.sort((a, b) => b.score - a.score);

        if (!sorted.length) return [];

        const top = sorted[0];

        // ⏱ Cooldown guard
        if (
            top.text === lastShownRef.current &&
            now - lastTimeRef.current < COOLDOWN_MS
        ) {
            return [];
        }

        // ✅ Accept new suggestion
        lastShownRef.current = top.text;
        lastTimeRef.current = now;

        // 🔒 Activate lock
        setLocked(true);
        setTimeout(() => setLocked(false), LOCK_DURATION_MS);

        // 🎯 Limit to top 3 suggestions
        return sorted.slice(0, 3);
    };

    return {
        rankSuggestions,
    };
};
