export const getNextLifecycleStep = (stage: string) => {
    switch (stage) {
        case "filing":
            return "Serve summons";

        case "summons":
            return "File written statement";

        case "evidence":
            return "Lead evidence";

        case "arguments":
            return "Present final arguments";

        case "judgment":
            return "Analyze judgment";

        case "appeal":
            return "Draft appeal";

        default:
            return "Unknown stage";
    }
};