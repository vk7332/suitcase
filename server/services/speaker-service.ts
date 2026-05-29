import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const detectSpeakers = async (transcript: string) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
You are a legal assistant.

Analyze the transcript and separate speakers into:

1. JUDGE
2. OPPONENT COUNSEL
3. MY ARGUMENTS

Return structured JSON:
{
  judge: [],
  opponent: [],
  me: []
}
        `,
            },
            {
                role: "user",
                content: transcript,
            },
        ],
    });

    const raw = completion.choices[0].message.content;

    try {
        return JSON.parse(raw!);
    } catch {
        return {
            judge: [],
            opponent: [],
            me: [],
        };
    }
};