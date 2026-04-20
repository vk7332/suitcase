import DashboardLayout from "../../components/layout/DashboardLayout";
import StampDutyCalculator from "../../calculators/stampDuty/stamp-duty-calculator";

export default function StampDutyPage() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Stamp Duty Calculator
                </h1>

                <StampDutyCalculator />
            </div>
        </DashboardLayout>
    );
}


