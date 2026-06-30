type Props = {
    status?: string;
};

export default function HearingStatusBadge({
    status,
}: Props) {
    const value =
        (status || "scheduled").toLowerCase();

    const styles: Record<string, string> = {
        scheduled:
            "bg-blue-100 text-blue-700 border-blue-200",

        completed:
            "bg-green-100 text-green-700 border-green-200",

        adjourned:
            "bg-yellow-100 text-yellow-700 border-yellow-200",

        cancelled:
            "bg-red-100 text-red-700 border-red-200",

        reserved_for_order:
            "bg-purple-100 text-purple-700 border-purple-200",

        disposed:
            "bg-gray-200 text-gray-800 border-gray-300",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full border text-xs font-bold ${
                styles[value] ||
                styles.scheduled
            }`}
        >
            {value
                .replace(/_/g, " ")
                .toUpperCase()}
        </span>
    );
}