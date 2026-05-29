import CourtFeeCalculator from "@/calculators/court-fee/CourtFeeCalculator";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CourtFeesPage() {
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Court Fee Calculator</h1>
            <CourtFeeCalculator />
        </DashboardLayout>
    );
}

