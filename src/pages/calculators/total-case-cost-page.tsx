import DashboardLayout from "../../components/layout/DashboardLayout";
import TotalCaseCostCalculator from "../../calculators/totalCaseCost/total-case-cost-calculator";

export default function TotalCaseCostPage() {
    return (
        <DashboardLayout>
            <TotalCaseCostCalculator />
        </DashboardLayout>
    );
}


