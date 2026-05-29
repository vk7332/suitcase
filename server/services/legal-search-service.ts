export const searchLegalCases = async (query: string) => {
    // SAFE MOCK (replace later with licensed API)

    const database = [
        {
            title: "Kailash Nath Associates v DDA (2015)",
            court: "Supreme Court of India",
            principle: "Compensation requires proof of loss",
        },
        {
            title: "Anvar P.V. v P.K. Basheer (2014)",
            court: "Supreme Court of India",
            principle: "Section 65B certificate mandatory",
        },
    ];

    return database.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase())
    );
};