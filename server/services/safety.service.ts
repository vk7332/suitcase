export const applySafety = ({
    strategy,
    timing,
    confidence,
}: {
    strategy: any;
    timing: any;
    confidence: number;
}) => {
    // 🚫 low confidence → no action
    if (confidence < 40) {
        return {
            allowed: false,
            reason: "Low confidence",
        };
    }

    // ⚠ only allow interrupt if strong
    if (
        strategy.action === "OBJECT" &&
        timing.decision !== "INTERRUPT_NOW"
    ) {
        return {
            allowed: false,
            reason: "Bad timing",
        };
    }

    return {
        allowed: true,
    };
};