interface Section {
    title: string;
    content: string[];
}

interface QA {
    question: string;
    answer: string;
    risk: "low" | "medium" | "high";
}

export const generateJudgeObjections = (sections: Section[]): QA[] => {
    const qa: QA[] = [];

    sections.forEach((section) => {
        section.content.forEach((para) => {
            const p = para.toLowerCase();

            // 🔴 EVIDENCE OBJECTION
            if (p.includes("payment") || p.includes("paid")) {
                qa.push({
                    question: "Where is the proof of payment?",
                    answer:
                        "The Plaintiff relies on documentary evidence such as bank records and receipts already placed on record.",
                    risk: "high",
                });
            }

            // 🔴 AGREEMENT OBJECTION
            if (p.includes("agreement")) {
                qa.push({
                    question: "Is the agreement legally enforceable?",
                    answer:
                        "Yes, the agreement satisfies all legal requirements and is supported by consideration and mutual consent.",
                    risk: "medium",
                });
            }

            // 🔴 LIMITATION
            if (p.includes("date")) {
                qa.push({
                    question: "Is the suit within limitation?",
                    answer:
                        "Yes, the cause of action arose within the statutory limitation period.",
                    risk: "high",
                });
            }

            // 🔴 GENERAL
            qa.push({
                question: `How do you prove: "${para}"?`,
                answer:
                    "The same is supported by documentary and oral evidence on record.",
                risk: "medium",
            });
        });
    });

    return qa;
};
