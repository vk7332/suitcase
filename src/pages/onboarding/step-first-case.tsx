import { useState } from "react";

export default function StepFirstCase({ next }: any) {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const createCase = async () => {
        if (!title) return;
        setLoading(true);
        try {
            // 🔹 call your API here
            await fetch("/api/case/create", {
                method: "POST",
                body: JSON.stringify({ title }),
            });
            next();
        } catch (err) {
            console.error(err);
            next(); // Still move forward for demo purposes
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 text-[#089CCE] rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                    📁
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Create Your First Case</h2>
                <p className="text-gray-500 mt-2 text-sm">Let's get started by adding your first case to the dashboard.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Case Title / Reference</label>
                    <input
                        placeholder="e.g. Sharma vs State of Punjab"
                        className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-[#089CCE] focus:border-transparent outline-none transition text-lg"
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                </div>

                <button
                    onClick={createCase}
                    disabled={!title || loading}
                    className="w-full bg-[#089CCE] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#078bb8] transition shadow-xl shadow-[#089CCE]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating..." : "Create & Continue"}
                </button>

                <button 
                    onClick={() => next()}
                    className="w-full text-gray-400 font-medium py-2 hover:text-gray-600 transition text-sm"
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
}
