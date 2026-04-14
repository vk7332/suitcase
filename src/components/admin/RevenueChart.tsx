import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { month: string; revenue: number }[];
}

export default function RevenueChart({ data }: Props) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
