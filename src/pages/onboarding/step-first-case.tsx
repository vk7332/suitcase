import { useState } from "react";

export default function StepFirstCase({ next }: any) {
    const [title, setTitle] = useState("");

    const createCase = async () => {
        // 🔹 call your API here
        await fetch("/api/case/create", {
            method: "POST",
            body: JSON.stringify({ title }),
        });

        next();
    };

    return (
        <div>
            <h2>Create Your First Case</h2>

            <input
                placeholder="Case Title"
                className="border p-2 block mb-2"
                onChange={(e) => setTitle(e.target.value)}
            />

            <button
                onClick={createCase}
                className="bg-black text-white px-4 py-2"
            >
                Create Case
            </button>
        </div>
    );
}