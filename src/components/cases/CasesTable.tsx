import { Link } from "react-router-dom";
import StageBadge from "./StageBadge";
import { formatDate } from "@/utils/date-formatter";


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
<th>Case Number</th>
<th>Client Side</th>
<th>Stage</th>
<th>Next Hearing</th>
<th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {cases?.map((c: any) => (
                    <tr key={c.id} className="border-t">
<td>{c.case_title}</td>
<td>{c.case_number}</td>
<td>{c.client_side}</td>
<td>
    <StageBadge stage={c.case_stage} />
</td>

<td>
    {formatDate(
        c.next_hearing_date
    )}
</td>
                        <td className="space-x-2">

<Link
    to={`/advocate/cases/${c.id}`}
    className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600"
>
    Open
</Link>

<button
    onClick={() =>
        onEdit(c)
    }
    className="px-3 py-1 rounded-lg bg-amber-50 text-amber-600"
>
 Edit
</button>

<button
    onClick={() =>
        onDelete(c.id)
    }
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


