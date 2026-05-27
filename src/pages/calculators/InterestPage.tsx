import DashboardLayout from "../../components/layout/DashboardLayout";
import InterestCalculator from "../../calculators/interest/InterestCalculator";

export default function InterestPage() {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">
                Interest Calculator
            </h1>

            <InterestCalculator />
        </DashboardLayout>
    );
}


