export const normalizeParagraphs = (paragraphs: string[]) => {
    return paragraphs.map((p) => {
        // remove existing numbering like "1." or "(i)"
        return p.replace(/^\s*(\d+\.|\(\w+\))\s*/, "").trim();
    });
};