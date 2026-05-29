export const calculateConfidence = ({
    contradiction,
    weakness,
    timing,
}: {
    contradiction?: string | null;
    weakness?: any;
    timing?: any;
}) => {
    let confidence = 0;

    if (contradiction) confidence += 40;
    if (weakness?.level === "WEAK") confidence += 30;
    if (timing?.decision === "INTERRUPT_NOW") confidence += 30;

    return Math.min(100, confidence);
};