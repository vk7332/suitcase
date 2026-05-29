export const autoExecute = async (step: string) => {
    if (step.includes("application")) {
        return {
            action: "draft",
            content: "Drafted application under relevant CPC provision...",
        };
    }

    if (step.includes("evidence")) {
        return {
            action: "attach",
            content: "Evidence marked and attached.",
        };
    }

    if (step.includes("bundle")) {
        return {
            action: "file",
            content: "Filed in bundle successfully.",
        };
    }

    return {
        action: "manual",
        content: "Manual intervention required.",
    };
};