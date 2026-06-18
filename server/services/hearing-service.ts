import { openai } from "../config/openai.js";
import { supabaseAdmin } from "../config/supabase.js";

export const addHearing = async (hearing: any) => {
    const { data, error } = await supabaseAdmin
        .from("hearings")
        .insert([hearing]);

    if (error) throw error;
    return data;
};

export const getHearings = async (caseId: string) => {
    const { data, error } = await supabaseAdmin
        .from("hearings")
        .select("*")
        .eq("case_id", caseId)
        .order("hearing_date", { ascending: true });

    if (error) throw error;
    return data;
};

interface Message {
    role: "judge" | "lawyer" | "opponent";
    content: string;
}

let sessions: Record<string, Message[]> = {};

export const startHearing = async (sessionId: string, facts: string) => {
    sessions[sessionId] = [
        {
            role: "judge",
            content: `Court is in session. Brief the matter. Facts: ${facts}`,
        },
    ];

    return sessions[sessionId];
};

export const continueHearing = async (
    sessionId: string,
    lawyerInput: string
) => {
    const history = sessions[sessionId] || [];

    history.push({
        role: "lawyer",
        content: lawyerInput,
    });

    const formattedHistory = history
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n");

    const prompt = `
You are simulating a real Indian courtroom.

Roles:
- Judge (strict, interrupting)
- Opponent Counsel (aggressive)
- Lawyer (user)

Conversation so far:
${formattedHistory}

Continue the hearing.

Respond as JSON:
{
  "judge": "...",
  "opponent": "...",
  "co_counsel": "... (advice to lawyer)",
  "next_hint": "... what lawyer should say next"
}
`;

    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
    });

    let parsed;
    try {
        parsed = JSON.parse(res.choices[0].message.content || "{}");
    } catch {
        parsed = { raw: res.choices[0].message.content };
    }

    history.push({ role: "judge", content: parsed.judge });
    history.push({ role: "opponent", content: parsed.opponent });

    sessions[sessionId] = history;

    return parsed;
};