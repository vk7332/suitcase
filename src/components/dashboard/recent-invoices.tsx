import EmptyState from "./empty-state";

export default function RecentInvoices({ invoices }: { invoices: any[] }) {
    if (!invoices.length) {
        return (
            <EmptyState title="No invoices generated yet" />
        );
    }

    return (
        <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Recent Invoices</h3>

            {invoices.map((inv) => (
                <div key={inv.id} className="border-b py-2">
                    ₹ {inv.total} - {inv.status}
                </div>
            ))}
        </div>
    );
}
