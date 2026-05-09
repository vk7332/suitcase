export const safeFallback = () => {
    return {
        strategy: { action: "SILENT", reason: "Fallback mode" },
        timing: { decision: "DO_NOT_INTERRUPT" },
        objection: null,
        followUp: null,
        crossExam: null,
        weakness: { score: 50, level: "MEDIUM" },
        win: { probability: 50, status: "BALANCED" },
        message: "System fallback active",
    };
};