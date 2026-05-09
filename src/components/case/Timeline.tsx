import React, { useEffect, useState } from "react";
import axios from "axios";
import ObjectionBox from "./ObjectionBox";

const Timeline = ({ caseId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`/api/case/timeline/${caseId}`).then(res => {
            setEvents(res.data);
        });

        // inside render
        <ObjectionBox objections={parsed.objections?.objections} />
    }, []);

    return (
        <div>
            <h3>📊 Case Timeline</h3>
            {events.map((e: any) => (
                <div key={e.id}>
                    <b>{e.event_date}</b> - {e.title}
                    <p>{e.description}</p>
                </div>
            ))}
        </div>
    );
};

const parsed = JSON.parse(e.description || "{}");

<h4>👨‍⚖️ Judge</h4>
{ parsed.speakers?.judge?.map((l, i) => <p key={i}>{l}</p>) }

<h4>⚖️ Opponent</h4>
{ parsed.speakers?.opponent?.map((l, i) => <p key={i}>{l}</p>) }

<h4>🧑‍💼 Me</h4>
{ parsed.speakers?.me?.map((l, i) => <p key={i}>{l}</p>) }

<h3>⚠️ Contradictions</h3>
{
    parsed.contradictions?.contradictions?.map((c, i) => (
        <div key={i}>
            <p>{c.statement1}</p>
            <p>{c.statement2}</p>
            <b>{c.issue}</b>
        </div>
    ))
}

<h3>🎯 Cross-Examination</h3>
{
    parsed.crossExam?.questions?.map((q, i) => (
        <p key={i}>Q{i + 1}: {q}</p>
    ))
}

export default Timeline;