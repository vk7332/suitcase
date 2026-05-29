import DashboardLayout from "../../components/layout/DashboardLayout";
import TotalCaseCostCalculator from "../../calculators/totalcasecost/TotalCaseCostCalculator";

export default function TotalCaseCostPage() {
    return (
        <DashboardLayout>
            <TotalCaseCostCalculator />
        </DashboardLayout>
    );
}


