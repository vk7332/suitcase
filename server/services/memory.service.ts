type Memory = {
    facts: string;
    history: string[];
};

const memoryStore: Record<string, Memory> = {};

export const initMemory = (caseId: string, facts: string) => {
    memoryStore[caseId] = {
        facts,
        history: [],
    };
};

export const addToHistory = (caseId: string, text: string) => {
    if (!memoryStore[caseId]) return;

    memoryStore[caseId].history.push(text);

    // keep last 5 only (performance)
    if (memoryStore[caseId].history.length > 5) {
        memoryStore[caseId].history.shift();
    }
};

export const getMemory = (caseId: string) => {
    return memoryStore[caseId] || { facts: "", history: [] };
};