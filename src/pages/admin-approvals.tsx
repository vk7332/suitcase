import { useEffect, useState } from "react";

export default function AdminApprovals() {
    const [items, setItems] = useState<any[]>([]);
    const [comment, setComment] = useState("");

    const fetchData = async () => {
        const res = await fetch("/api/approvals", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();
        setItems(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const approve = async (id: string) => {
        await fetch("/api/approvals/approve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ id, comment }),
        });

        fetchData();
    };

    const reject = async (id: string) => {
        await fetch("/api/approvals/reject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ id, comment }),
        });

        fetchData();
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
                Approval Dashboard
            </h1>

            <textarea
                placeholder="Comment..."
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 w-full mb-4"
            />

            {items.map((item) => (
                <div key={item.id} className="border p-3 mb-3">
                    <p><strong>Action:</strong> {item.action}</p>
                    <p><strong>Entity:</strong> {item.entity}</p>

                    <div className="mt-2 flex gap-2">
                        <button
                            onClick={() => approve(item.id)}
                            className="bg-green-600 text-white px-3 py-1"
                        >
                            Approve
                        </button>

                        <button
                            onClick={() => reject(item.id)}
                            className="bg-red-600 text-white px-3 py-1"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}