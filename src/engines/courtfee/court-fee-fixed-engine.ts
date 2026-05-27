export const calculateFixedFee = (fees: any[], category: string) => {
    const feeData = fees.find((fee) => fee.category === category);

    if (!feeData) throw new Error("invalid category");
    return feeData.fee || 0;
};
