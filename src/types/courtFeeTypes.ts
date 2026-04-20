export interface court-feeInput {
    state: string;
    caseType: string;
    amount: number;
    defendants?: number;
    applications?: number;
    affidavits?: number;
    notaryDocs?: number;
    vakalatnama?: boolean;
}

export interface court-feeResult {
    court-fee: number;
    filingFee: number;
    processFee: number;
    applicationFee: number;
    affidavitFee: number;
    notaryFee: number;
    vakalatnamaFee: number;
    total: number;
}

export interface FeeRules {
    slabs: any;
    fixedFees: any;
}


