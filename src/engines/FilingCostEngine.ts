export class FilingCostEngine {
    static calculate(input: any) {
        const fixed = {
            filingFee: 20,
            processFee: 0.75,
            applicationFee: 20,
            affidavitFee: 20,
            notaryFee: 55,
            vakalatnama: 20,
            welfare: 25,
        };

        return {
            total:
                input.court-fee +
                fixed.filingFee +
                input.defendants * fixed.processFee +
                input.applications * fixed.applicationFee +
                input.affidavits * fixed.affidavitFee +
                input.notaryDocs * fixed.notaryFee +
                (input.vakalatnama ? fixed.vakalatnama + fixed.welfare : 0),
        };
    }
}
