export default function ClientsTable({ clients, onEdit, onDelete }: any) {
    return (
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-100">
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {clients?.map((c: any) => (
                    <tr key={c.id} className="border-t">
                        <td>{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>
                            <button onClick={() => onEdit(c)}>Edit</button>
                            <button onClick={() => onDelete(c.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
