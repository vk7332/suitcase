import PartitionSuitCalculator from "@/calculators/partition-suit/PartitionSuitCalculator";
import DashboardLayout from "@/components/layout/DashboardLayout";

const PartitionSuitPage = () => {
    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Partition Suit Calculator</h1>
                <PartitionSuitCalculator />
            </div>
        </DashboardLayout>
    );
};

export default PartitionSuitPage;
