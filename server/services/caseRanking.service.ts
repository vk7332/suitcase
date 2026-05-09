interface CaseLaw {
    title: string;
    court: string;
    principle: string;
}

export const rankCaseLaws = (
    cases: CaseLaw[],
    context: string
) => {
    const ctx = context.toLowerCase();

    return cases
        .map((c) => {
            let score = 0;

            const text =
                (c.title + " " + c.principle).toLowerCase();

            // 🎯 keyword match
            ctx.split(" ").forEach((word) => {
                if (text.includes(word)) score += 10;
            });

            // 🎯 Supreme Court priority
            if (c.court.toLowerCase().includes("supreme")) {
                score += 20;
            }

            // 🎯 strong legal terms
            if (text.includes("breach")) score += 10;
            if (text.includes("evidence")) score += 10;
            if (text.includes("limitation")) score += 10;

            return {
                ...c,
                score,
            };
        })
        .sort((a, b) => b.score - a.score);
};