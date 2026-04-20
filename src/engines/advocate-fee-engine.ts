export interface AdvocateFeeInput {
    claimAmount: number;
    feePercentage: number;
}

export interface AdvocateFeeResult {
    advocateFee: number;
}

export const calculateAdvocateFee = (
    input: AdvocateFeeInput
): AdvocateFeeResult => {
    const advocateFee =
        (input.claimAmount * input.feePercentage) / 100;

    return {
        advocateFee: Number(advocateFee.toFixed(2)),
    };
};


