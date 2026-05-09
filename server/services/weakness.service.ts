export const scoreWeakness = (text: string) => {
    let score = 100;
    const lower = text.toLowerCase();

    // ❌ no evidence
    if (
        lower.includes("no document") ||
        lower.includes("not filed") ||
        lower.includes("no proof")
    ) {
        score -= 40;
    }

    // ❌ vague language
    if (
        lower.includes("maybe") ||
        lower.includes("approximately") ||
        lower.includes("around")
    ) {
        score -= 25;
    }

    // ❌ contradiction indicators
    if (
        lower.includes("however") ||
        lower.includes("but") ||
        lower.includes("earlier")
    ) {
        score -= 15;
    }

    // ❌ delay / uncertainty
    if (lower.includes("don’t remember")) {
        score -= 20;
    }

    // clamp
    score = Math.max(0, Math.min(100, score));

    let level = "STRONG";
    if (score < 30) level = "WEAK";
    else if (score < 70) level = "MEDIUM";

    return { score, level };
};