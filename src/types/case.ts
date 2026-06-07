export type CaseStatus =
| "draft"
| "active"
| "pending"
| "disposed"
| "archived";

export interface Case {
id: string;

case_title: string;

case_number?: string;

court_name?: string;

status: CaseStatus;

client_id?: string | null;

organization_id?: string | null;

chamber_id?: string | null;

tenant_id?: string | null;

court_url?: string | null;

created_by: string;

created_at: string;

}

export interface CreateCasePayload {
case_title: string;

case_number?: string;

court_name?: string;

status?: CaseStatus;
client_id?: string | null;

organization_id?: string | null;
chamber_id?: string | null;

tenant_id?: string | null;
court_url?: string | null;
}
