import { Link } from "react-router-dom";

interface Props {
    message: string;
}

export default function UsageLimitAlert({ message }: Props) {
    return (
        <div className="bg-red-50 border border-red-300 p-4 rounded-md text-center">
            <p className="text-red-600 font-medium">{message}</p>
            <Link
                to="/subscription"
                className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
                Upgrade to Pro
            </Link>
        </div>
    );
}


