import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

const Verify = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["verify", id],
        queryFn: async () => {
            const res = await api.get(`/verify/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <div>Checking...</div>;

    return (
        <div>
            <h2>Audit Verification</h2>
            <p>Status: {data.valid ? "Valid ✅" : "Tampered ❌"}</p>
            <p>Total Logs: {data.totalLogs}</p>
        </div>
    );
};

export default Verify;
