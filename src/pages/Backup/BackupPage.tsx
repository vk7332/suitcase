import { getFullBackup } from "../../services/BackupService";
import { exportJSON, exportCSV } from "../../utils/exportData";

export default function BackupPage() {
    const handleBackupJSON = async () => {
        const data = await getFullBackup();
        exportJSON(data, "LegalBackup");
    };

    const handleBackupCSV = async () => {
        const data = await getFullBackup();

        exportCSV(data.clients || [], "clients");
        exportCSV(data.cases || [], "cases");
        exportCSV(data.payments || [], "payments");
        exportCSV(data.diary || [], "diary");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
                Backup & Export
            </h2>

            <button
                onClick={handleBackupJSON}
                className="bg-blue-600 text-white p-2 mr-2"
            >
                Export Full Backup (JSON)
            </button>

            <button
                onClick={handleBackupCSV}
                className="bg-green-600 text-white p-2"
            >
                Export CSV Files
            </button>
        </div>
    );
}


