import { useState } from "react";

type Props = {
    initialValues?: any;
    onSubmit: (values: any) => Promise<void>;
    loading?: boolean;
};

export default function CaseForm({
    initialValues,
    onSubmit,
    loading = false,
}: Props) {
    const [caseTitle, setCaseTitle] = useState(
        initialValues?.case_title || ""
    );

    const [caseNumber, setCaseNumber] = useState(
        initialValues?.case_number || ""
    );

    const [courtName, setCourtName] = useState(
        initialValues?.court_name || ""
    );

    const [status, setStatus] = useState(
        initialValues?.status || "active"
    );

    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!caseTitle) {
            setError("Case title is required");
            return;
        }

        setError("");

        try {
            await onSubmit({
                case_title: caseTitle,
                case_number: caseNumber,
                court_name: courtName,
                status,
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to save case");
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Case Information
                </h2>

                <p className="text-gray-500 mt-2">
                    Create and manage litigation matters professionally.
                </p>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Case Title
                    </label>

                    <input
                        type="text"
                        value={caseTitle}
                        onChange={(e) =>
                            setCaseTitle(e.target.value)
                        }
                        placeholder="e.g. Sharma vs State of Punjab"
                        className="w-full border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#089CCE] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Case Number
                    </label>

                    <input
                        type="text"
                        value={caseNumber}
                        onChange={(e) =>
                            setCaseNumber(e.target.value)
                        }
                        placeholder="e.g. CRM-M-1234-2026"
                        className="w-full border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#089CCE] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Court Name
                    </label>

                    <input
                        type="text"
                        value={courtName}
                        onChange={(e) =>
                            setCourtName(e.target.value)
                        }
                        placeholder="Punjab & Haryana High Court"
                        className="w-full border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#089CCE] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#089CCE] outline-none bg-white"
                    >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="disposed">Disposed</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#089CCE] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#078bb8] transition shadow-lg shadow-[#089CCE]/20 disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : "Save Case"}
                </button>
            </div>
        </div>
    );
}