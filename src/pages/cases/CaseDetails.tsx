import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/utils/supabase/supabase-client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ActivityLog from "@/components/case/ActivityLog";
import CaseDocumentsList from "@/components/cases/CaseDocumentsList";
import LegalResearchBox from "@/components/case/LegalResearchBox";
import AIAssistant from "@/components/case/AiAssistant";
import MultiDocAI from "@/components/case/MultiDocAi";
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
    const { id: caseId } = useParams();
    const [caseData, setCaseData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCase = async () => {
            const { data, error } = await supabase
                .from("cases")
                .select("*")
                .eq("id", caseId)
                .single();
            
            if (!error) {
                setCaseData(data);
            }
            setLoading(false);
        };
        fetchCase();
    }, [caseId]);

    if (loading) return <DashboardLayout><div className="p-6">Loading...</div></DashboardLayout>;
    if (!caseData) return <DashboardLayout><div className="p-6 text-red-600">Case not found</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{caseData.case_title || caseData.title}</h1>
                        <p className="text-gray-500">{caseData.case_number}</p>
                    </div>
                    <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            caseData.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                            {caseData.status?.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold mb-4">Case Overview & Activity</h2>
                            <ActivityLog caseId={caseId!} />
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold mb-4">Documents</h2>
                            <CaseDocumentsList caseId={caseId!} />
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold mb-4">AI Research & Assistance</h2>
                            <div className="space-y-6">
                                <LegalResearchBox />
                                <AIAssistant />
                                <MultiDocAI />
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold mb-4">Live Court Assistant</h2>
                            <LiveAssistant liveData={{}} />
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold mb-4">Strategy & Analysis</h2>
                            <div className="space-y-6">
                                <StrategyBox />
                                <JudgeSimulator />
                                <HearingSimulator />
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold mb-4">Court Room Tools</h2>
                            <div className="space-y-6">
                                <LiveCourtMode />
                                <HearingRecorder />
                                <CourtArgument />
                            </div>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold mb-4">Automation & Monitoring</h2>
                            <div className="space-y-6">
                                <AnalyticsDashboard />
                                <AutopilotBox />
                                <LimitationBox caseId={caseId!} />
                                <LifecycleTracker />
                                <Timeline />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
