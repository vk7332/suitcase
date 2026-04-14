import DashboardLayout from "../components/layout/DashboardLayout";
import LimitationCalculator from "../calculators/limitation/LimitationCalculator";

export default function LimitationPage() {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-4">
                Limitation Calculator
            </h1>

            <LimitationCalculator />
        </DashboardLayout>
    );
}
