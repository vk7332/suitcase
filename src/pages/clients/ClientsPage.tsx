import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ClientForm from "../../components/clients/ClientForm";
import ClientsTable from "../../components/clients/ClientsTable";
import SearchBar from "../../components/search/SearchBar";
import { searchClients } from "../../services/search-service";

import {
    getClients,
    addClient,
    updateClient,
    deleteClient,
} from "../../services/client-service";

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [editData, setEditData] = useState(null);
    const handleSearch = async (query: string) => {
        if (!query) {
            loadClients();
            return;
        }

        const results = await searchClients(query);
        setClients(results || []);
    };

    const loadClients = async () => {
        const data = await getClients();
        setClients(data || []);
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleSave = async (client: any) => {
        if (editData) {
            await updateClient((editData as any).id, client);
            setEditData(null);
        } else {
            await addClient(client);
        }
        loadClients();
    };

    const handleDelete = async (id: string) => {
        await deleteClient(id);
        loadClients();
    };

    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4">Clients</h2>

            <ClientForm onSave={handleSave} editData={editData} />
            <SearchBar onSearch={handleSearch} />
            <ClientsTable
                clients={clients}
                onEdit={setEditData}
                onDelete={handleDelete}
            />
        </DashboardLayout>
    );
}


