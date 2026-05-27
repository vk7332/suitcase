interface Section {
    title: string;
    content: string[];
}

interface CaseData {
    plaintiff_name: string;
    defendant_name: string;
    court_name: string;
}

export const generateFinalArguments = ({
    sections,
    caseData,
}: {
    sections: Section[];
    caseData: CaseData;
}) => {
    const script: string[] = [];

    // 🟢 1. OPENING
    script.push(
        `May it please this Hon’ble Court, I appear on behalf of ${caseData.plaintiff_name}.`
    );

    script.push(
        `The present case is against ${caseData.defendant_name} and arises out of the facts placed on record.`
    );

    script.push("");

    // 🟢 2. FACTS SUMMARY
    const factsSection = sections.find((s) =>
        s.title.toUpperCase().includes("FACTS")
    );

    if (factsSection) {
        script.push("Brief facts of the case are as follows:");

        factsSection.content.slice(0, 5).forEach((f, i) => {
            script.push(`${i + 1}. ${f}`);
        });

        script.push("");
    }

    // 🟢 3. ISSUES
    script.push("The following issues arise for consideration:");

    script.push("1. Whether the Defendant has committed breach?");
    script.push("2. Whether the Plaintiff is entitled to relief?");
    script.push("");

    // 🟢 4. LEGAL ARGUMENTS (FROM GROUNDS)
    const grounds = sections.find((s) =>
        s.title.toUpperCase().includes("GROUNDS")
    );

    if (grounds) {
        script.push("It is respectfully submitted:");

        grounds.content.forEach((g, i) => {
            script.push(
                `${i + 1}. That ${g}`
            );
        });

        script.push("");
    }

    // 🟢 5. REBUTTAL (OPTIONAL DEFENCE ANTICIPATION)
    script.push("Without prejudice, even if the defence is considered:");

    script.push(
        "The Defendant has failed to produce any credible evidence in support of their claims."
    );

    script.push("");

    // 🟢 6. PRAYER
    script.push(
        "In light of the above submissions, it is most respectfully prayed that this Hon’ble Court may be pleased to:"
    );

    script.push(
        "a) Decree the suit in favour of the Plaintiff;"
    );

    script.push(
        "b) Grant any other relief deemed fit in the interest of justice."
    );

    script.push("");

    // 🟢 7. CLOSING LINE
    script.push("Much obliged, My Lord.");

    return script;
};