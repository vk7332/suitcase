export default function DiaryTable({ diary, onDelete }: any) {
    return (
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-100">
                    <th>Hearing Date</th>
                    <th>Stage</th>
                    <th>Notes</th>
                    <th>Next Date</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {diary?.map((d: any) => (
                    <tr key={d.id} className="border-t">
                        <td>{d.hearing_date}</td>
                        <td>{d.stage}</td>
                        <td>{d.notes}</td>
                        <td>{d.next_date}</td>

                        <td>
                            <button
                                onClick={() => onDelete(d.id)}
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


