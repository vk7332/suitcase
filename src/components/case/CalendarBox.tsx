import React, { useEffect, useState } from "react";
import axios from "axios";

interface Event {
    id: string;
    title: string;
    event_date: string;
}

const CalendarBox = ({ caseId }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);

    const loadEvents = async () => {
        const res = await axios.get("/api/events", {
            params: { case_id: caseId },
        });
        setEvents(res.data || []);
    };

    const addEvent = async () => {
        if (!title || !date) return alert("Enter all fields");

        await axios.post("/api/events", {
            case_id: caseId,
            title,
            event_type: "hearing",
            event_date: date,
        });

        setTitle("");
        setDate("");
        loadEvents();
    };

    const syncHearing = async () => {
        setLoading(true);
        try {
            await axios.post("/api/sync-hearing", {
                case_id: caseId,
                caseNumber: "CIV/123/2024", // dynamic later
                courtUrl: "https://examplecourt.gov.in",
            });

            alert("✅ Hearing synced");
            loadEvents();
        } catch {
            alert("❌ Sync failed");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <div style={{ marginTop: 30 }}>
            <h3>📅 Case Calendar</h3>

            <div>
                <input
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button onClick={addEvent}>Add Event</button>
            </div>

            <div style={{ marginTop: 10 }}>
                <button onClick={syncHearing} disabled={loading}>
                    🔄 Sync Next Hearing
                </button>
            </div>

            <ul style={{ marginTop: 15 }}>
                {events.map((e) => (
                    <li key={e.id}>
                        {e.title} —{" "}
                        {new Date(e.event_date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CalendarBox;