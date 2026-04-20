// src/components/ui/empty-state.tsx

export default function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
}: any) {
    return (
        <div className="text-center py-10 border rounded">

            <h3 className="text-lg font-semibold mb-2">
                {title}
            </h3>

            <p className="text-gray-500 mb-4">
                {description}
            </p>

            {onAction && (
                <button
                    onClick={onAction}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    {actionLabel}
                </button>
            )}

        </div>
    );
}