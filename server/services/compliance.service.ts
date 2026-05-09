export const applyCompliance = (result: any) => {
    let warnings: string[] = [];

    // ⚖️ Avoid aggressive / disrespectful tone
    if (result.objection?.toLowerCase().includes("false")) {
        warnings.push("Avoid direct allegation; use neutral legal language");
    }

    // ⚠️ Prevent over-interruption
    if (result.strategy?.action === "OBJECT" && result.timing?.decision !== "INTERRUPT_NOW") {
        warnings.push("Improper timing for objection");
    }

    // 🧑‍⚖️ Judge respect safeguard
    if (result.judgeMood?.mood === "STRICT") {
        warnings.push("Maintain brevity and precision");
    }

    // 📊 Low confidence safeguard
    if (result.confidence && result.confidence < 50) {
        warnings.push("Low confidence — verify before acting");
    }

    return {
        ...result,
        complianceWarnings: warnings,
    };
};