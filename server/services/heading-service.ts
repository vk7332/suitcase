const KNOWN_HEADINGS = [
    "FACTS",
    "FACTS OF THE CASE",
    "GROUNDS",
    "PRAYER",
    "CAUSE OF ACTION",
    "RELIEF",
    "SUBMISSIONS",
    "DECLARATION",
];

export const detectSections = (paragraphs: string[]) => {
    const sections: any[] = [];

    let currentSection = {
        title: "MAIN",
        content: [] as string[],
    };

    paragraphs.forEach((para) => {
        const clean = para.trim().toUpperCase();

        const isHeading = KNOWN_HEADINGS.some(
            (h) => clean === h || clean.includes(h)
        );

        if (isHeading) {
            // push previous section
            sections.push(currentSection);

            currentSection = {
                title: clean,
                content: [],
            };
        } else {
            currentSection.content.push(para);
        }
    });

    sections.push(currentSection);

    return sections;
};