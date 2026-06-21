interface Props {
    stage?: string;
}

export default function StageBadge({
    stage,
}: Props) {

    const value = stage || "Unknown";

    return (
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            {value}
        </span>
    );
}