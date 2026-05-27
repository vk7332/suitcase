import { openai } from "../config/openai";

export const decideStrategy = ({
    text,
    contradiction,
    role,
    judgeSpeaking,
}: {
    text: string;
    contradiction?: string | null;
    role: "opponent" | "judge";
    judgeSpeaking?: boolean;
}) => {
    const lower = text.toLowerCase();

    // 🧑‍⚖️ Judge speaking → silence
    if (role === "judge" || judgeSpeaking) {
        return {
            action: "SILENT",
            reason: "Judge is speaking",
        };
    }

    // ⚠ contradiction → object
    if (contradiction) {
        return {
            action: "OBJECT",
            reason: "Contradiction detected",
        };
    }

    // ❓ vague claim → cross
    if (
        lower.includes("maybe") ||
        lower.includes("approximately") ||
        lower.includes("around")
    ) {
        return {
            action: "CROSS",
            reason: "Vague statement",
        };
    }

    // 💪 opportunity → argue
    if (
        lower.includes("no document") ||
        lower.includes("not filed") ||
        lower.includes("no proof")
    ) {
        return {
            action: "ARGUE",
            reason: "Opponent weak",
        };
    }

    // 🤫 default safe
    return {
        action: "SILENT",
        reason: "No strategic gain",
    };
};