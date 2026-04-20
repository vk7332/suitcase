import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { ReferralTrend } from "@/types/affiliateAnalytics";

interface Props {
    data: ReferralTrend[];
}

const ReferralTrendChart: React.FC<Props> = ({ data }) => {
    return (
        <div className="p-6 bg-white shadow rounded-xl border">
            <h2 className="text-lg font-semibold mb-4">Referral Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#2563eb" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReferralTrendChart;


