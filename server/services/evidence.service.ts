interface Exhibit {
    title: string;
    type: "plaintiff" | "defendant";
}

interface CaseData {
    plaintiff_name: string;
}

export const generateEvidenceAffidavit = ({
    caseData,
    exhibits,
}: {
    caseData: CaseData;
    exhibits: Exhibit[];
}) => {
    let pCount = 1;
    let dCount = 1;

    const formatted = exhibits.map((ex) => {
        if (ex.type === "plaintiff") {
            return {
                label: `Ex.P${pCount++}`,
                title: ex.title,
            };
        } else {
            return {
                label: `Ex.D${dCount++}`,
                title: ex.title,
            };
        }
    });

    return {
        title: "AFFIDAVIT OF EVIDENCE",
        content: [
            `I, ${caseData.plaintiff_name}, do hereby solemnly affirm:`,
            "That I rely upon the following documents:",
            ...formatted.map((e) => `${e.label} – ${e.title}`),
            "That the contents are true and correct.",
        ],
        exhibits: formatted,
    };
};