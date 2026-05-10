import React, { useEffect, useState } from "react";
import axios from "axios";
import ObjectionBox from "./ObjectionBox";

const Timeline = ({ caseId }: { caseId: string }) => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`/api/case/timeline/${caseId}`).then(res => {
            setEvents(res.data);
        }).catch(console.error);
    }, [caseId]);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold">📊 Case Timeline</h3>
            {events.map((e: any) => {
                const parsed = e.description ? JSON.parse(e.description) : {};
                return (
                    <div key={e.id} className="border p-4 rounded shadow-sm bg-white">
                        <div className="mb-4">
                            <b className="text-blue-600">{e.event_date}</b> - <span className="font-semibold">{e.title}</span>
                            <p className="mt-1 text-gray-700">{e.description}</p>
                        </div>

                        {parsed.objections?.objections && (
                            <ObjectionBox objections={parsed.objections.objections} />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <h4 className="font-bold text-gray-800">👨‍⚖️ Judge</h4>
                                {parsed.speakers?.judge?.map((l: string, i: number) => <p key={i} className="text-sm italic">{l}</p>)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">⚖️ Opponent</h4>
                                {parsed.speakers?.opponent?.map((l: string, i: number) => <p key={i} className="text-sm italic">{l}</p>)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">🧑‍💼 Me</h4>
                                {parsed.speakers?.me?.map((l: string, i: number) => <p key={i} className="text-sm italic">{l}</p>)}
                            </div>
                        </div>

                        {parsed.contradictions?.contradictions && (
                            <div className="mt-4">
                                <h4 className="font-bold text-red-600">⚠️ Contradictions</h4>
                                {parsed.contradictions.contradictions.map((c: any, i: number) => (
                                    <div key={i} className="mt-2 p-2 bg-red-50 border-l-4 border-red-500">
                                        <p className="text-sm">1: {c.statement1}</p>
                                        <p className="text-sm">2: {c.statement2}</p>
                                        <b className="text-xs">{c.issue}</b>
                                    </div>
                                ))}
                            </div>
                        )}

                        {parsed.crossExam?.questions && (
                            <div className="mt-4">
                                <h4 className="font-bold text-green-600">🎯 Cross-Examination</h4>
                                {parsed.crossExam.questions.map((q: string, i: number) => (
                                    <p key={i} className="text-sm">Q{i + 1}: {q}</p>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Timeline;
