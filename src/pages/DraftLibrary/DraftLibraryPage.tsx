import { useEffect, useState } from "react";
import {
    getDrafts,
    addDraft,
    deleteDraft,
} from "../../services/DraftService";

export default function DraftLibraryPage() {
    const [drafts, setDrafts] = useState<any[]>([]);
    const [form, setForm] = useState({
        title: "",
        category: "",
        content: "",
    });

    useEffect(() => {
        loadDrafts();
    }, []);

    const loadDrafts = async () => {
        const data = await getDrafts();
        setDrafts(data || []);
    };

    const handleSubmit = async () => {
        await addDraft(form);
        loadDrafts();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                Draft Library
            </h2>

            {/* FORM */}
            <div className="border p-4 mb-4">
                <input
                    placeholder="Title"
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />

                <input
                    placeholder="Category"
                    onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                    }
                />

                <textarea
                    placeholder="Draft Content"
                    rows={6}
                    onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                    }
                />

                <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white p-2"
                >
                    Save Draft
                </button>
            </div>

            {/* LIST */}
            {drafts.map((d) => (
                <div key={d.id} className="border p-3 mb-2">
                    <h3 className="font-bold">{d.title}</h3>
                    <p>{d.category}</p>
                    <pre className="bg-gray-100 p-2 mt-2">
                        {d.content}
                    </pre>

                    <button
                        onClick={() => deleteDraft(d.id)}
                        className="text-red-500 mt-2"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}


