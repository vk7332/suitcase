type Props = {
    title: string;
    action?: () => void;
    buttonText?: string;
};

export default function EmptyState({
    title,
    action,
    buttonText,
}: Props) {
    return (
        <div className="text-center p-6 border rounded-lg">
            <p className="text-gray-500 mb-3">{title}</p>

            {action && (
                <button
                    onClick={action}
                    className="bg-blue-600 text-white px-4 py-2"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
}