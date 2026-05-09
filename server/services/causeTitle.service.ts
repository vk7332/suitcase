export const detectCauseTitle = (paragraphs: string[]) => {
    let courtLine = "";
    let parties: string[] = [];

    let captureParties = false;

    paragraphs.forEach((para) => {
        const upper = para.toUpperCase().trim();

        // 🎯 Detect court line
        if (upper.includes("IN THE COURT")) {
            courtLine = para;
        }

        // 🎯 Start capturing parties
        if (upper.includes("VERSUS") || upper.includes("VS")) {
            captureParties = true;
            parties.push("VERSUS");
            return;
        }

        if (captureParties) {
            parties.push(para);
        }
    });

    return {
        court: courtLine,
        parties,
    };
};

export const extractParties = (parties: string[]) => {
    let plaintiff = "";
    let defendant = "";

    parties.forEach((line) => {
        const lower = line.toLowerCase();

        if (lower.includes("plaintiff")) {
            plaintiff = line.replace(/\.{2,}.*plaintiff/i, "").trim();
        }

        if (lower.includes("defendant")) {
            defendant = line.replace(/\.{2,}.*defendant/i, "").trim();
        }
    });

    return {
        plaintiff,
        defendant,
    };
};