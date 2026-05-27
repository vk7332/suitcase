import mammoth from "mammoth";

export const parseDocxToParagraphs = async (buffer: Buffer) => {
    const result = await mammoth.extractRawText({ buffer });

    const text = result.value;

    // Split into paragraphs (clean)
    const paragraphs = text
        .split("\n")
        .map(p => p.trim())
        .filter(p => p.length > 0);

    return paragraphs;
};