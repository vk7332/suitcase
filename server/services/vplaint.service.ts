export const generatePlaintTemplate = ({
    caseData,
}: any) => {
    return {
        causeTitle: {
            court: caseData.court_name || "IN THE COURT OF ______",
            plaintiff: caseData.plaintiff_name || "PLAINTIFF NAME",
            defendant: caseData.defendant_name || "DEFENDANT NAME",
        },

        sections: [
            {
                title: "INTRODUCTION",
                content: [
                    "That the present suit is filed by the Plaintiff seeking relief against the Defendant.",
                ],
            },
            {
                title: "FACTS OF THE CASE",
                content: [
                    "That the Plaintiff is a law-abiding citizen...",
                    "That the Defendant entered into an agreement...",
                ],
            },
            {
                title: "CAUSE OF ACTION",
                content: [
                    "That the cause of action arose on...",
                ],
            },
            {
                title: "GROUNDS",
                content: [
                    "Because the Defendant acted illegally...",
                    "Because the Plaintiff suffered loss...",
                ],
            },
            {
                title: "PRAYER",
                content: [
                    "It is therefore most respectfully prayed that this Hon’ble Court may be pleased to:",
                    "(a) Pass a decree in favour of the Plaintiff;",
                    "(b) Grant any other relief deemed fit;",
                ],
            },
            {
                title: "VERIFICATION",
                content: [
                    "I, the Plaintiff above named, do hereby verify that the contents of this plaint are true and correct.",
                ],
            },
        ],
    };
};