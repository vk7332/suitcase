export const calculatePartitionSuit = (propertyValue: number) => {
    const courtFee = propertyValue * 0.02;

    return {
        courtFee: Number(courtFee.toFixed(2)),
        total: Number((propertyValue + courtFee).toFixed(2)),
    };
}; 
