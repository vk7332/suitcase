export const calculateSpecificPerformanceCost = (
    agreementValue: number,
    courtFeeRate: number
) => {
    const courtFee = (agreementValue * courtFeeRate) / 100;
    return {
        courtFee: Number(courtFee.toFixed(2)),
        totalCost: Number((agreementValue + courtFee).toFixed(2)),
    };
};


