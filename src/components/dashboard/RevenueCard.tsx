type Props = {
    total: number;
};

export default function RevenueCard({ total }: Props) {
    return (
        <div className="border p-4 rounded-lg bg-green-50">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold text-green-700">
                ₹ {total}
            </p>
        </div>
    );
}
