interface Section {
    title: string;
    content: string[];
}

interface CaseData {
    court_name: string;
    plaintiff_name: string;
    defendant_name: string;
    case_number?: string;
}

export const generateWrittenArguments = ({
    sections,
    caseData,
}: {
    sections: Section[];
    caseData: CaseData;
}) => {
    const doc: any[] = [];

    // 🟢 1. COURT TITLE
    doc.push({
        type: "heading",
        text: caseData.court_name || "IN THE COURT OF ______",
    });

    doc.push({
        type: "subheading",
        text: `Case No: ${caseData.case_number || "_____"}`,
    });

    doc.push("");

    // 🟢 2. PARTY DETAILS
    doc.push({
        type: "text",
        text: `${caseData.plaintiff_name} ... Plaintiff`,
    });

    doc.push({
        type: "text",
        text: "VERSUS",
    });

    doc.push({
        type: "text",
        text: `${caseData.defendant_name} ... Defendant`,
    });

    doc.push("");

    // 🟢 3. TITLE
    doc.push({
        type: "heading",
        text: "WRITTEN ARGUMENTS ON BEHALF OF THE PLAINTIFF",
    });

    doc.push("");

    // 🟢 4. INTRODUCTION
    doc.push({
        type: "paragraph",
        text: `The present written submissions are filed on behalf of the Plaintiff in the above-mentioned matter.`,
    });

    doc.push("");

    // 🟢 5. FACTS
    const facts = sections.find(s =>
        s.title.toUpperCase().includes("FACTS")
    );

    if (facts) {
        doc.push({ type: "heading", text: "BRIEF FACTS" });

        facts.content.forEach((f, i) => {
            doc.push({
                type: "paragraph",
                text: `${i + 1}. ${f}`,
            });
        });

        doc.push("");
    }

    // 🟢 6. ISSUES
    doc.push({ type: "heading", text: "ISSUES FOR DETERMINATION" });

    doc.push({
        type: "paragraph",
        text: "1. Whether the Defendant has committed breach?",
    });

    doc.push({
        type: "paragraph",
        text: "2. Whether the Plaintiff is entitled to relief?",
    });

    doc.push("");

    // 🟢 7. ARGUMENTS
    const grounds = sections.find(s =>
        s.title.toUpperCase().includes("GROUNDS")
    );

    if (grounds) {
        doc.push({ type: "heading", text: "ARGUMENTS" });

        grounds.content.forEach((g, i) => {
            doc.push({
                type: "paragraph",
                text: `${i + 1}. That ${g}`,
            });
        });

        doc.push("");
    }

    // 🟢 8. PRAYER
    doc.push({ type: "heading", text: "PRAYER" });

    doc.push({
        type: "paragraph",
        text: "In view of the above submissions, it is most respectfully prayed that this Hon’ble Court may be pleased to:",
    });

    doc.push({
        type: "paragraph",
        text: "(a) Decree the suit in favour of the Plaintiff;",
    });

    doc.push({
        type: "paragraph",
        text: "(b) Grant any other relief deemed fit.",
    });

    doc.push("");

    // 🟢 9. CONCLUSION
    doc.push({
        type: "paragraph",
        text: "The Plaintiff humbly submits that the case is proved and deserves to be decreed.",
    });

    return doc;
};