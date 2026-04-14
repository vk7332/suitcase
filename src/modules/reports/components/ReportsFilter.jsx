import React, { useState } from "react";

const ReportsFilter = ({ onFilter }) => {
    const today = new Date().toISOString().split("T")[0];

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(startDate, endDate);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
            <div>
                <label className="block text-sm font-medium">From</label>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium">To</label>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
            >
                Generate
            </button>
        </form>
    );
};

export default ReportsFilter;
