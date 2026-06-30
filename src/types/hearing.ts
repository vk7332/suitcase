export interface Hearing {
    id: string;

    case_id: string;

    tenant_id?: string | null;

    hearing_date: string;

    stage?: string | null;

    notes?: string | null;

    status?:
        | "scheduled"
        | "completed"
        | "adjourned"
        | "cancelled"
        | "reserved_for_order"
        | "disposed";

    created_at?: string;

    created_by?: string | null;
}