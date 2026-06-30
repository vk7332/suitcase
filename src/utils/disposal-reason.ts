export function getDisposalReason(outcome?: string) {
    if (!outcome) {
        return {
            disposed: false,
            reason: null,
        };
    }

    const text = outcome.toLowerCase();

    const rules = [
        {
            keywords: ["dismissed in default"],
            reason: "Dismissed in Default",
        },
        {
            keywords: ["dismissed"],
            reason: "Dismissed",
        },
        {
            keywords: ["withdrawn", "withdraw"],
            reason: "Withdrawn",
        },
        {
            keywords: ["compromise", "compromised", "settled"],
            reason: "Compromised",
        },
        {
            keywords: ["lok adalat"],
            reason: "Lok Adalat Settlement",
        },
        {
            keywords: ["decreed", "decree"],
            reason: "Decreed",
        },
        {
            keywords: ["judgment pronounced"],
            reason: "Judgment Pronounced",
        },
        {
            keywords: ["finally decided"],
            reason: "Finally Decided",
        },
        {
            keywords: ["disposed"],
            reason: "Disposed",
        },

        // Criminal matters

        {
            keywords: ["acquitted"],
            reason: "Acquitted",
        },
        {
            keywords: ["convicted"],
            reason: "Convicted",
        },
        {
            keywords: ["discharged"],
            reason: "Discharged",
        },
        {
            keywords: ["quashed"],
            reason: "Quashed",
        },
        {
            keywords: ["compounded"],
            reason: "Compounded",
        },
    ];

    for (const rule of rules) {
        if (
            rule.keywords.some(keyword =>
                text.includes(keyword)
            )
        ) {
            return {
                disposed: true,
                reason: rule.reason,
            };
        }
    }

    return {
        disposed: false,
        reason: null,
    };
}