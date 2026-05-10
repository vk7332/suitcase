import EmptyState from "./empty-state";

export default function RecentCases({ cases }: { cases: any[] }) {
    if (!cases.length) {
        return (
            <EmptyState
                title="No cases yet"
                buttonText="Create Case"
                action={() => (window.location.href = "/cases")}
            />
        );
    }

    return (
        <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Recent Cases</h3>

            {cases.map((c) => (
                <div key={c.id} className="border-b py-2">
                    {c.title}
                </div>
            ))}
        </div>
    );
}
