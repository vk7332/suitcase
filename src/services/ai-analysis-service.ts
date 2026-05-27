export async function analyzeCase(caseText: string) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Analyze this legal case and suggest strategy:/n${caseText}`,
                },
            ],
        }),
    });

    const data = await res.json();
    return data.choices[0].message.content;
}


