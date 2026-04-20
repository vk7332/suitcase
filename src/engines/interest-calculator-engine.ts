export class InterestCalculatorEngine {
    static calculate(p: number, r: number, t: number) {
        const interest = (p * r * t) / 100;
        return { interest, total: p + interest };
    }
}


