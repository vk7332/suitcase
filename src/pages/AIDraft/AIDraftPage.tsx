import { useState } from "react";
import { generateDraft } from "../../services/AIDraftService";

export default function AIDraftPage() {
    const [prompt, setPrompt] = useState("");
    const [draft, setDraft] = useState("");

    const handleGenerate = async () => {
        const result = await generateDraft(prompt);
        setDraft(result);
    };

    return (
        <div className="p-4">
            <h2 className="font-bold mb-2">AI Draft Generator</h2>

            <textarea
                placeholder="e.g. Draft a civil suit for recovery"
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full border p-2"
            />

            <button
                onClick={handleGenerate}
                className="bg-green-600 text-white p-2 mt-2"
            >
                Generate
            </button>

            <pre className="mt-4 bg-gray-100 p-3 whitespace-pre-wrap">
                {draft}
            </pre>
        </div>
    );
}


