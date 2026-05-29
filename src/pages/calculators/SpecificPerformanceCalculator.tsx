import SpecificPerformanceCalculator from "@/calculators/specific-performance/SpecificPerformanceCalculator";
import DashboardLayout from "@/components/layout/DashboardLayout";

const SpecificPerformancePage = () => {
    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Specific Performance Calculator</h1>
                <SpecificPerformanceCalculator />
            </div>
        </DashboardLayout>
    );
};

export default SpecificPerformancePage;


