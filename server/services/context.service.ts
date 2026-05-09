type CaseContext = {
    history: string[];
    facts: string;
    lastStrategy?: any;
    lastWeakness?: any;
    judgeTrend?: any;
    lastActionAt?: number;
};

const contextStore: Record<string, CaseContext> = {};

export const getContext = (caseId: string): CaseContext => {
    if (!contextStore[caseId]) {
        contextStore[caseId] = {
            history: [],
            facts: "",
        };
    }
    return contextStore[caseId];
};

export const updateContext = (
    caseId: string,
    updates: Partial<CaseContext>
) => {
    const ctx = getContext(caseId);

    contextStore[caseId] = {
        ...ctx,
        ...updates,
    };

    return contextStore[caseId];
};

export const addToHistory = (caseId: string, entry: string) => {
    const ctx = getContext(caseId);
    ctx.history.push(entry);

    // keep last 50 entries (memory control)
    if (ctx.history.length > 50) {
        ctx.history.shift();
    }
};