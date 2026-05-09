export default function MemberList({ members }: any) {
    return (
        <div>
            {members.map((m: any) => (
                <div key={m.id} className="border p-2 mb-2">
                    <p>{m.name}</p>
                    <p>{m.email}</p>
                    <p>{m.role}</p>
                </div>
            ))}
        </div>
    );
}