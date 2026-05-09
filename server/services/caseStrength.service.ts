interface AnalysisResult {
    score: number;
    strength: "Strong" | "Moderate" | "Weak";
    issues: string[];
    suggestions: string[];
}

export const analyzeCaseStrength = (sections: any[]): AnalysisResult => {
    let score = 100;
    const issues: string[] = [];
    const suggestions: string[] = [];

    const titles = sections.map(s => s.title.toUpperCase());

    // 🔴 Missing sections
    if (!titles.includes("GROUNDS")) {
        score -= 20;
        issues.push("Missing legal grounds");
        suggestions.push("Add strong legal arguments under GROUNDS");
    }

    if (!titles.includes("PRAYER")) {
        score -= 15;
        issues.push("No relief claimed");
        suggestions.push("Add clear PRAYER clause");
    }

    // 🔴 Weak facts
    const facts = sections.find(s =>
        s.title.toUpperCase().includes("FACTS")
    );

    if (!facts || facts.content.length < 3) {
        score -= 20;
        issues.push("Insufficient factual details");
        suggestions.push("Expand facts with dates and events");
    }

    // 🔴 Evidence detection
    const hasEvidence = sections.some(s =>
        s.content.some((p: string) =>
            p.toLowerCase().includes("document") ||
            p.toLowerCase().includes("receipt") ||
            p.toLowerCase().includes("agreement")
        )
    );

    if (!hasEvidence) {
        score -= 25;
        issues.push("No clear documentary evidence");
        suggestions.push("Attach and reference supporting documents");
    }

    // 🔴 Legal keywords
    const hasLegalTerms = sections.some(s =>
        s.content.some((p: string) =>
            p.toLowerCase().includes("law") ||
            p.toLowerCase().includes("section") ||
            p.toLowerCase().includes("act")
        )
    );

    if (!hasLegalTerms) {
        score -= 20;
        issues.push("Weak legal foundation");
        suggestions.push("Cite relevant laws and provisions");
    }

    // 🎯 FINAL
    let strength: "Strong" | "Moderate" | "Weak" = "Strong";

    if (score < 50) strength = "Weak";
    else if (score < 75) strength = "Moderate";

    return {
        score,
        strength,
        issues,
        suggestions,
    };
};