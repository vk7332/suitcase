import { useEffect, useState } from "react";

export default function UsagePage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchUsage = async () => {
            const res = await fetch("/api/usage", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const d = await res.json();
            setData(d);
        };

        fetchUsage();
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
                Usage Dashboard
            </h1>

            <p>Plan: {data.plan}</p>

            <p>
                Cases: {data.usage.cases} / {data.limits.cases}
            </p>

            <p>
                Members: {data.usage.members} / {data.limits.members}
            </p>
        </div>
    );
}
