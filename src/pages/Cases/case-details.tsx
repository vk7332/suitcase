import ActivityLog from "@/components/case/activity-log";
import CaseDocumentsList from "@/components/case/caseDocumentsList";

export default function CaseDetails() {
    const caseId = "123"; // This would come from route params in a real app    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Case Details</h1>
            <ActivityLog caseId={caseId} />
            <CaseDocumentsList caseId={caseId} />
        </div>
    );
}

