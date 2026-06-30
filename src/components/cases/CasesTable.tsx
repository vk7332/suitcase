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
    {c.status === "disposed" ? (
        <div className="space-y-1">
            <StageBadge stage={c.case_stage} />

            <div className="text-xs text-red-600 font-semibold">
                Final Stage
            </div>
        </div>
    ) : (
        <StageBadge stage={c.case_stage} />
    )}
</td>

<td>
    {c.status === "disposed" ? (
        <div className="space-y-1">
            <div className="inline-flex items-center rounded-full bg-red-100 text-red-700 font-bold px-3 py-1 text-xs">
                DISPOSED
            </div>

            <div className="text-sm font-semibold text-gray-700">
                {formatDate(c.disposed_date)}
            </div>

            {c.disposal_reason && (
                <div className="text-xs text-red-600">
                    {c.disposal_reason}
                </div>
            )}
        </div>
    ) : (
        formatDate(c.next_hearing_date)
    )}
</td>
                        <td className="space-x-2">

<Link
    to={`/advocate/cases/${c.id}`}
    className={
        c.status === "disposed"
            ? "px-3 py-1 rounded-lg bg-red-50 text-red-700 font-semibold"
            : "px-3 py-1 rounded-lg bg-blue-50 text-blue-600"
    }
>
    {c.status === "disposed"
        ? "View Record"
        : "Open"}
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