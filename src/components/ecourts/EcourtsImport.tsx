import React, { useState } from "react";
import { useSubscription } from "../../hooks/useSubscription";

const ECOURTS_BASE_URL =
    "https://services.ecourts.gov.in/ecourtindia_v6/";

const EcourtsImport: React.FC = () => {
    const subscription = useSubscription();
    const [searchType, setSearchType] = useState<"name" | "enrollment">("name");
    const [query, setQuery] = useState("");
    const isAllowed = subscription.plan === "PRO" || subscription.plan === "PREMIUM";

    const openEcourts = () => {
        if (!query.trim()) {
            alert("Please enter Advocate Name or Enrollment Number.");
            return;
        }

        // Redirect to official eCourts website
        window.open(ECOURTS_BASE_URL, "_blank");
    };

    if (!isAllowed) {
        return (
            <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
                <h3 className="text-yellow-800 font-semibold mb-2">Upgrade Required</h3>
                <p className="text-yellow-700 mb-4">
                    Access to eCourts import is available for PRO and PREMIUM subscribers. Please upgrade your plan to use this feature.
                </p>
                <button
                    onClick={() => window.location.href = "/pricing"}
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                >
                    View Pricing
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Import from eCourts</h2>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setSearchType("name")}
                    className={`px-4 py-2 rounded ${searchType === "name" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                    Advocate Name
                </button>
                <button
                    onClick={() => setSearchType("enrollment")}
                    className={`px-4 py-2 rounded ${searchType === "enrollment" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                    Enrollment Number
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={searchType === "name" ? "Enter Advocate Name" : "Enter Enrollment Number"}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border p-2 rounded"
                />
            </div>
            <button
                onClick={openEcourts}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Search on eCourts
            </button>
        </div>
    );
};

export default EcourtsImport;


