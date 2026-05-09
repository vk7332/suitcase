export const calculateWinProbability = ({
    weakness,
    contradiction,
    strategy,
}: {
    weakness: any;
    contradiction?: string | null;
    strategy?: any;
}) => {
    let score = 50; // neutral start

    // 🔴 opponent weak → increase
    if (weakness?.level === "WEAK") score += 20;
    if (weakness?.level === "MEDIUM") score += 5;

    // ⚠ contradiction → strong boost
    if (contradiction) score += 15;

    // ⚖ strategy alignment
    if (strategy?.action === "ARGUE") score += 5;
    if (strategy?.action === "OBJECT") score += 10;

    // clamp
    score = Math.max(0, Math.min(100, score));

    return {
        probability: score,
        status:
            score > 65 ? "FAVORABLE"
                : score > 45 ? "BALANCED"
                    : "RISKY",
    };
};