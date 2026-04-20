// src/components/ui/skeleton.tsx

export default function Skeleton({ height = "h-4" }) {
    return (
        <div className={`bg-gray-200 animate-pulse rounded ${height}`} />
    );
}