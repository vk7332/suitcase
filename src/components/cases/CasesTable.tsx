import { Link } from "react-router-dom";

export default function CasesTable({
    cases,
    onEdit,
    onDelete,
}: any) {
    return (
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-100">
                    <th>Case Title</th>
                    <th>Court</th>
                    <th>Case No.</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {cases?.map((c: any) => (
                    <tr key={c.id} className="border-t">
                        <td>{c.case_title}</td>
                        <td>{c.court_name}</td>
                        <td>{c.case_number}</td>
                        <td>{c.status}</td>

                        <td className="space-x-2">
                            <Link
                                to={`/case/${c.id}`}
                                className="text-blue-600"
                            >
                                Open
                            </Link>

                            <button onClick={() => onEdit(c)}>
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(c.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


