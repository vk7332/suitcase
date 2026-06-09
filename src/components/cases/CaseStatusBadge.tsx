type Props = {
    status?: string;
};

export default function CaseStatusBadge({ status }: Props) {
    const normalized = (status || "active").toLowerCase();

    const styles: Record<string, string> = {
        active: "bg-green-100 text-green-700 border-green-200",
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        disposed: "bg-gray-200 text-gray-700 border-gray-300",
        stay: "bg-red-100 text-red-700 border-red-200",
        draft: "bg-blue-100 text-blue-700 border-blue-200",
        archived: "bg-purple-100 text-purple-700 border-purple-200",
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                styles[normalized] ||
                "bg-gray-100 text-gray-700 border-gray-200"
            }`}
        >
            {normalized.toUpperCase()}
        </span>
    );
}