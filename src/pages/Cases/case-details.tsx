import ActivityLog from "@/components/case/activity-log";
import CaseDocumentsList from "@/components/case/caseDocumentsList";
import LegalResearchBox from "@/components/case/LegalResearchBox";
import AIAssistant from "@/components/case/AIAssistant";
import MultiDocAI from "@/components/case/MultiDocAI";
import CourtArgument from "@/components/case/CourtArgument";
import LiveAssistant from "@/components/case/LiveAssistant";
import StrategyBox from "../../components/case/StrategyBox";
import JudgeSimulator from "@/components/case/JudgeSimulator";
import HearingSimulator from "@/components/case/HearingSimulator";
import LiveCourtMode from "../../components/case/LiveCourtMode";
import HearingRecorder from "../../components/case/HearingRecorder";
import AnalyticsDashboard from "@/components/case/AnalyticsDashboard";
import AutopilotBox from "@/components/case/AutopilotBox";
import LimitationBox from "../../components/case/LimitationBox";
import LifecycleTracker from "@/components/case/LifecycleTracker";
import LiveAssistant from "@/components/case/LiveAssistant";
import Timeline from "../../components/case/Timeline";

export default function CaseDetails() {
    const caseId = "123"; // This would come from route params in a real app    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Case Details</h1>
            <ActivityLog caseId={caseId} />
            <CaseDocumentsList caseId={caseId} />
            <LegalResearchBox />
            <AIAssistant />
            <MultiDocAI />
            <CourtArgument />
            <LiveAssistant />
            <StrategyBox />
            <JudgeSimulator />
            <HearingSimulator />
            <LiveCourtMode />
            <HearingRecorder />
            <AnalyticsDashboard />
            <AutopilotBox />
            <LifecycleTracker />
            // inside component
            <LiveAssistant liveData={latestAnalysis} />
            <LimitationBox caseId={case.id} />
            <h2 className="text-xl font-bold mt-6">Timeline</h2>
            <Timeline caseId={caseId} />
            <h2 className="text-xl font-bold mt-6">Objections</h2>
            {events.map((e: any) => {
                const parsed = JSON.parse(e.description || "{}");
                return (
                    <div key={e.id}>
                        <b>{e.event_date}</b> - {e.title}
                        <p>{e.description}</p>
                    </div>
                );
            })

            };
