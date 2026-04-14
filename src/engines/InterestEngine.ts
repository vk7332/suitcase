export interface InterestComparison {
    frequency: string;
    finalAmount: number;
    interestEarned: number;
}

// Simple Interest: P * R * T / 100
export const calculateSimpleInterest = (p: number, r: number, t: number) => {
    const interest = (p * r * t) / 100;
    return {
        interest: Math.round(interest),
        total: Math.round(p + interest)
    };
};

// Comparative CI Logic
export const calculateComparativeCI = (p: number, r: number, t: number): InterestComparison[] => {
    const frequencies = [
        { name: 'Yearly', n: 1 },
        { name: 'Half-Yearly', n: 2 },
        { name: 'Quarterly', n: 4 },
        { name: 'Monthly', n: 12 }
    ];

    return frequencies.map(f => {
        const amount = p * Math.pow((1 + (r / 100) / f.n), (f.n * t));
        return {
            frequency: f.name,
            finalAmount: Math.round(amount),
            interestEarned: Math.round(amount - p)
        };
    });
};
