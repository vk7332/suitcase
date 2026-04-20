import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseclient";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function AnalyticsCards() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const { data: earnings } = await supabase
                .from("earnings")
                .select("*");

            const grouped: any = {};

            earnings?.forEach((e) => {
                grouped[e.user_id] =
                    (grouped[e.user_id] || 0) + e.amount;
            });

            const chartData = Object.keys(grouped).map((key) => ({
                user: key,
                earnings: grouped[key],
            }));

            setData(chartData);
        };

        load();
    }, []);

    return (
        <div>
            <h2>Revenue Analytics</h2>

            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="user" />
                <YAxis />
                <Bar dataKey="earnings" />
            </BarChart>
        </div>
    );
}