import React, { useEffect, useState } from "react";
import { getClientLedger } from "../services/ledgerService";
import LedgerTable from "../components/LedgerTable";

const ClientLedger = () => {
    const [entries, setEntries] = useState([]);
    const clientId = "REPLACE_WITH_CLIENT_ID"; // Replace dynamically later

    useEffect(() => {
        fetchLedger();
    }, []);

    const fetchLedger = async () => {
        const data = await getClientLedger(clientId);
        setEntries(data);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                Client Ledger
            </h2>
            <LedgerTable entries={entries} />
        </div>
    );
};

export default ClientLedger;
