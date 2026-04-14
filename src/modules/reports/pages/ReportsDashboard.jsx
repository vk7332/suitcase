import React, { useState } from "react";
import ReportsFilter from "../components/ReportsFilter";
import GSTReportTable from "../components/GSTReportTable";
import IncomeReportTable from "../components/IncomeReportTable";
import {
    fetchGSTReport,
    fetchIncomeReport,
} from "../services/reportService";
import { exportToExcel } from "../utils/exportToExcel";

const ReportsDashboard = () => {
    const [gstData, setGstData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);

    const handleFilter = async (startDate, endDate) => {
        const gst = await fetchGSTReport(startDate, endDate);
        const income = await fetchIncomeReport(startDate, endDate);
        setGstData(gst);
        setIncomeData(income);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">GST & Income Reports</h2>

            <ReportsFilter onFilter={handleFilter} />

            <div className="flex gap-3 mb-4">
                <button
                    onClick={() => exportToExcel(gstData, "GST_Report")}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Export GST to Excel
                </button>

                <button
                    onClick={() => exportToExcel(incomeData, "Income_Report")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Export Income to Excel
                </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">GST Report</h3>
            <GSTReportTable data={gstData} />

            <h3 className="text-xl font-semibold mt-6 mb-2">Income Report</h3>
            <IncomeReportTable data={incomeData} />
        </div>
    );
};

export default ReportsDashboard;
