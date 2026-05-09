import judgments from "../data/judgments.json";

export const retrieveJudgments = (query: string) => {
    const q = query.toLowerCase();

    return judgments.filter((j) =>
        j.keywords.some((k) => q.includes(k))
    );
};