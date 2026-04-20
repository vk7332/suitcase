import React, { useState } from "react";
import { useSubscription } from "../../hooks/useSubscription";

const ECOURTS_BASE_URL =
    "https://services.ecourts.gov.in/ecourtindia_v6/";

const EcourtsImport: React.FC = () => {
    const { subscription } = useSubscription();
    const [searchType, setSearchType] = useState<"name" | "enrollment">("name");
    const [query, setQuery] = useState("");

    const isAllowed =
        subscription?.plan === "PRO" ||
        subscription?.plan === "PREMIUM";

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


