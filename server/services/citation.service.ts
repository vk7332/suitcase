import axios from "axios";

export const fetchCitations = async (query: string) => {
    try {
        // 🔍 Example (replace with real API/scraper later)
        const results = [
            {
                title: "Kailash Nath Associates v DDA (2015)",
                court: "Supreme Court of India",
                principle: "Compensation requires proof of loss",
            },
            {
                title: "ONGC v Saw Pipes Ltd (2003)",
                court: "Supreme Court of India",
                principle: "Arbitral award can be set aside if against public policy",
            },
        ];

        return results;
    } catch {
        return [];
    }
};

interface Citation {
    title: string;
    court: string;
    principle: string;
}

const citationDB: Record<string, Citation[]> = {
    breach: [
        {
            title: "Hadley v Baxendale (1854)",
            court: "English Court",
            principle:
                "Damages for breach are limited to foreseeable losses.",
        },
    ],

    agreement: [
        {
            title: "Balfour v Balfour (1919)",
            court: "Court of Appeal",
            principle:
                "Agreements without intention to create legal relations are not enforceable.",
        },
    ],

    limitation: [
        {
            title: "State of Punjab v Gurdev Singh",
            court: "Supreme Court of India",
            principle:
                "Limitation bars the remedy, not the right.",
        },
    ],

    evidence: [
        {
            title: "Anvar P.V. v P.K. Basheer",
            court: "Supreme Court of India",
            principle:
                "Electronic evidence must comply with Section 65B of Evidence Act.",
        },
    ],
};

export const applyCitations = (sections: any[]) => {
    return sections.map((section) => {
        if (!section.title.toUpperCase().includes("GROUNDS")) {
            return section;
        }

        const enhancedContent = section.content.map((para: string) => {
            const lower = para.toLowerCase();

            let citations: Citation[] = [];

            Object.keys(citationDB).forEach((key) => {
                if (lower.includes(key)) {
                    citations = [...citations, ...citationDB[key]];
                }
            });

            if (citations.length === 0) return para;

            const citationText = citations
                .map(
                    (c) =>
                        `${c.title} (${c.court}) – ${c.principle}`
                )
                .join("\n");

            return `${para}\n\n[Relied on Case Law]\n${citationText}`;
        });

        return {
            ...section,
            content: enhancedContent,
        };
    });
};