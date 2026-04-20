import { Link } from "react-router-dom";

export default function ClientCaseList({ cases }: any) {
    if (!cases.length) return <p>No cases found</p>;

    return (
        <div className="space-y-3">
            {cases.map((c: any) => (
                <div key={c.id} className="border p-3 rounded">
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-sm text-gray-500">{c.status}</p>

                    <Link
                        to={`/client/case/${c.id}`}
                        className="text-blue-600"
                    >
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
}