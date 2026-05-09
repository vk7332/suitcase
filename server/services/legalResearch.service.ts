interface ResearchResult {
    answer: string;
    cases: {
        title: string;
        court: string;
        principle: string;
    }[];
    reasoning: string[];
    confidence: number;
}

export const legalResearch = async (
    query: string
): Promise<ResearchResult> => {
    const q = query.toLowerCase();

    let answer = "No direct answer found.";
    let cases: any[] = [];
    let reasoning: string[] = [];
    let confidence = 50;

    // 🔍 SECTION 65B (EVIDENCE)
    if (q.includes("65b") || q.includes("electronic evidence")) {
        answer =
            "Yes, a certificate under Section 65B of the Evidence Act is mandatory for admissibility of electronic evidence.";

        cases.push({
            title: "Anvar P.V. v P.K. Basheer (2014)",
            court: "Supreme Court of India",
            principle:
                "Electronic evidence requires Section 65B certificate.",
        });

        reasoning.push(
            "The Supreme Court clarified that electronic records must comply with Section 65B."
        );

        confidence = 90;
    }

    // 🔍 BREACH OF CONTRACT
    if (q.includes("breach") || q.includes("contract")) {
        answer =
            "Damages for breach of contract depend on actual loss and foreseeability.";

        cases.push({
            title: "Kailash Nath Associates v DDA (2015)",
            court: "Supreme Court of India",
            principle:
                "Compensation requires proof of loss under Section 74.",
        });

        cases.push({
            title: "Hadley v Baxendale (1854)",
            court: "English Court",
            principle:
                "Only foreseeable damages are recoverable.",
        });

        reasoning.push(
            "Courts award compensation only when loss is proven and foreseeable."
        );

        confidence = 85;
    }

    // 🔍 LIMITATION
    if (q.includes("limitation")) {
        answer =
            "Limitation bars the remedy but not the right.";

        cases.push({
            title: "State of Punjab v Gurdev Singh",
            court: "Supreme Court of India",
            principle:
                "Limitation extinguishes remedy, not the right.",
        });

        reasoning.push(
            "Even if remedy is barred, underlying right may survive."
        );

        confidence = 80;
    }

    return {
        answer,
        cases,
        reasoning,
        confidence,
    };
};