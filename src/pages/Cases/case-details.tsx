import { useState } from "react";
import ActivityLog from "@/components/case/activity-log";
import CaseDocumentsList from "@/components/cases/caseDocumentsList";
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
import Timeline from "../../components/case/Timeline";

export default function CaseDetails() {
    const caseId = "123"; // This would come from route params in a real app    
    const [events] = useState<any[]>([]);
    const [caseData] = useState<any>({ id: caseId });
    const [latestAnalysis] = useState<any>({});

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Case Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section>
                    <ActivityLog caseId={caseId} />
                    <CaseDocumentsList caseId={caseId} />
                    <LegalResearchBox />
                    <AIAssistant />
                    <MultiDocAI />
                    <CourtArgument />
                    <LiveAssistant liveData={latestAnalysis} />
                </section>
                <section>
                    <StrategyBox />
                    <JudgeSimulator />
                    <HearingSimulator />
                    <LiveCourtMode />
                    <HearingRecorder />
                    <AnalyticsDashboard />
                    <AutopilotBox />
                    <LifecycleTracker />
                    <LimitationBox caseId={caseData.id} />
                </section>
            </div>

            <h2 className="text-xl font-bold mt-6">Timeline</h2>
            <Timeline caseId={caseId} />
            
            <h2 className="text-xl font-bold mt-6">Objections</h2>
            <div className="space-y-4">
                {events.map((e: any) => {
                    return (
                        <div key={e.id} className="border p-3 rounded">
                            <b>{e.event_date}</b> - {e.title}
                            <p>{e.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
