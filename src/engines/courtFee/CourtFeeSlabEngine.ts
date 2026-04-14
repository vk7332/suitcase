export class court-feeSlabEngine {
    static calculate(amount: number, slabs: any[]) {
        let fee = 0;

        for (const slab of slabs) {
            const min = slab.min;
            const max = slab.max ?? amount;

            if (amount > min) {
                const taxable = Math.min(amount, max) - min;
                fee += taxable * slab.rate;
            }
        }

        return Math.round(fee);
    }
}
