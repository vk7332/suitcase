export interface CourtFeeInput {
    state: string;
    caseType: string;
    amount: number;
    defendants?: number;
    applications?: number;
    affidavits?: number;
    notaryDocs?: number;
    vakalatnama?: boolean;
}

export interface CourtFeeResult {
    courtFee: number;
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


