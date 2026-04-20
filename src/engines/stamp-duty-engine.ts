export class StampDutyEngine {
    static calculate(propertyValue: number): number {
        if (!propertyValue) return 0;

        // Example 5% stamp duty
        return propertyValue * 0.05;
    }
}


