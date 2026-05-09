export const decideTiming = ({
    text,
    strategy,
    role,
    lastInterruptAt,
}: {
    text: string;
    strategy: string;
    role: "opponent" | "judge";
    lastInterruptAt?: number;
}) => {
    const now = Date.now();
    const lower = text.toLowerCase();

    // 🧑‍⚖️ Judge speaking → NEVER interrupt
    if (role === "judge") {
        return {
            decision: "DO_NOT_INTERRUPT",
            reason: "Judge speaking",
        };
    }

    // ⏱ Cooldown (avoid irritation)
    if (lastInterruptAt && now - lastInterruptAt < 10000) {
        return {
            decision: "WAIT",
            reason: "Recent interruption",
        };
    }

    // ⚠ contradiction → interrupt immediately
    if (strategy === "OBJECT") {
        return {
            decision: "INTERRUPT_NOW",
            reason: "Strong objection point",
        };
    }

    // 🟡 vague statements → wait for completion
    if (
        lower.includes("maybe") ||
        lower.includes("approximately")
    ) {
        return {
            decision: "WAIT",
            reason: "Let opponent finish vague claim",
        };
    }

    // 🔵 weak argument → interrupt at pause
    if (strategy === "CROSS" || strategy === "ARGUE") {
        return {
            decision: "WAIT",
            reason: "Better at natural pause",
        };
    }

    return {
        decision: "DO_NOT_INTERRUPT",
        reason: "No benefit",
    };
};