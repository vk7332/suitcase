export interface TaxSettings {
    assessmentYear: string;
    standardDeduction: number;
    cessRate: number; // e.g., 0.04 for 4%
    rebateLimitNew: number; // e.g., 700000
    rebateLimitOld: number; // e.g., 500000
}

export interface ClientRecord {
    id: string;
    name: string;
    pan?: string;
    assessmentYear: string;
    lastCalculated: string; // ISO Date string
    taxRegime: 'old' | 'new';
    totalIncome: number;
    taxLiability: number;
    incomeDetails?: Record<string, unknown>; // JSONB for detailed income breakdown
    deductions?: Record<string, unknown>; // JSONB for deductions
    auditReport?: AuditResult; // full audit result object
    pdfData?: string; // Base64 encoded PDF
}

// src/types/client.ts

export interface AuditResult {
    totalIncome: number;
    taxableIncome: number;
    oldTax: number;
    newTax: number;
    recommendedRegime: 'old' | 'new';
    savings: number;
    casualTax?: number; // Optional for ITR-2 Online Gaming
    cess: number;
    finalLiability: number;
}

export interface TaxSettings {
    assessmentYear: string;
    standardDeduction: number;
    cessRate: number;
    rebateLimitNew: number;
    isComparisonMode: boolean; // NEW: Toggle for Scenario Analysis
    provisionalDeduction?: number; // NEW: Test value (e.g., 100,000)
}
export interface SavedClientAudit {
    id: string;
    clientName: string;
    date: string;
    totalIncome: number;
    finalLiability: number;
    regime: 'old' | 'new';
    fullResult: AuditResult; // Stores the object for PDF regeneration
}
