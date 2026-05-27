import { supabaseAdmin } from "../config/supabase";
import { openai } from "../config/openai";
import { detectSpeakers } from "./speaker-service.ts";
import { logEvent } from "./log-service.ts";
import { detectContradictions } from "./contradiction-service.ts";
import { generateCrossExam } from "./cross-exam-service.ts";
import { generateObjections } from "./objection-service.ts";

export const generateHearingNotes = async ({
    transcript,
    caseId,
    tenantId,
}: {
    transcript: string;
    caseId: string;
    tenantId: string;
}) => {
    // 🎤 Speaker detection
    const speakers = await detectSpeakers(transcript);

    // 🤖 AI formatting
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content:
                    "Convert hearing transcript into structured legal notes with headings: Judge Remarks, Opponent Arguments, My Arguments, Orders, Next Steps.",
            },
            {
                role: "user",
                content: `
Transcript:
${transcript}

Speaker Analysis:
${JSON.stringify(speakers)}
`,
            }
        ],
    });

    const opponentLines = speakers.opponent || [];

    // 🔍 detect contradictions
    const contradictions = await detectContradictions(opponentLines);

    // 🎯 generate cross-exam
    const crossExam = await generateCrossExam(opponentLines);
    // 🚫 generate objections
    const objections = await generateObjections(opponentLines);

    const formatted = completion.choices[0].message.content;
    await logEvent({
        type: "AI_HEARING_ANALYSIS",
        data: formatted,
    });

    // 📊 Save to timeline
    const { data, error } = await supabaseAdmin
        .from("case_events")
        .insert([
            {
                case_id: caseId,
                tenant_id: tenantId,
                title: "Hearing Notes (Auto)",
                summary: formatted,
                type: "HEARING",
                event_date: new Date(),
                contradictions: JSON.stringify(contradictions),
                cross_exam: JSON.stringify(crossExam),
                objections: JSON.stringify(objections),
                description: JSON.stringify({
                    formatted,
                    speakers,
                    contradictions,
                    crossExam,
                    objections,
                }),
            },
        ]);

    if (error) throw error;

    return formatted;
};
