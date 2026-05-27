import DashboardLayout from "../../components/layout/DashboardLayout";
import FilingCostCalculator from "../../calculators/filingcost/FilingCostCalculator";

export default function FilingCostPage() {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">
                Filing Cost Calculator
            </h1>

            <FilingCostCalculator />
        </DashboardLayout>
    );
}


