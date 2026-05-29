export const validatePleading = (sections: any[]) => {
    const REQUIRED_SECTIONS = [
        "FACTS",
        "CAUSE OF ACTION",
        "GROUNDS",
        "PRAYER",
    ];

    const found = sections.map(s => s.title.toUpperCase());

    const missing = REQUIRED_SECTIONS.filter(req =>
        !found.some(f => f.includes(req))
    );

    const warnings = [];

    if (missing.length) {
        warnings.push(`Missing sections: ${missing.join(", ")}`);
    }

    if (!found.includes("VERIFICATION")) {
        warnings.push("Verification clause missing");
    }

    if (!found.includes("PRAYER")) {
        warnings.push("No relief claimed (PRAYER missing)");
    }

    return {
        isValid: warnings.length === 0,
        warnings,
    };
};