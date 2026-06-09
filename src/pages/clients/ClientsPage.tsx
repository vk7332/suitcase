import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
    getClients,
    deleteClient,
} from "@/services/client-service";

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            setLoading(true);

            const data =
                await getClients();

            setClients(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients =
        useMemo(() => {
            return clients.filter(
                (client) =>
                    client.client_name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||
                    client.phone_number
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||
                    client.email
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );
        }, [clients, search]);

    const handleDelete =
        async (id: string) => {
            const confirmed = confirm(
                "Delete this client?"
            );

            if (!confirmed) return;

            try {
                await deleteClient(id);

                loadClients();
            } catch (err: any) {
                console.error(err);

                alert(
                    err.message ||
                    "Failed to delete client"
                );
            }
        };

    return (
        <DashboardLayout>

            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* HEADER */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div>
                        <h1 className="text-4xl font-black text-gray-900">
                            Clients
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your litigation
                            clients and communication.
                        </p>
                    </div>

                    <Link
                        to="/clients/create"
                        className="bg-[#089CCE] text-white px-6 py-4 rounded-2xl font-bold hover:bg-[#078bb8] transition"
                    >
                        Add Client
                    </Link>

                </div>

                {/* SEARCH */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search clients..."
                        className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#089CCE]"
                    />

                </div>

                {/* LIST */}

                {loading ? (
                    <div className="text-gray-500">
                        Loading clients...
                    </div>
                ) : filteredClients.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center">

                        <h2 className="text-2xl font-bold text-gray-800">
                            No clients found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Add your first client
                            to start litigation
                            management.
                        </p>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {filteredClients.map(
                            (client) => (
                                <div
                                    key={client.id}
                                    className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition"
                                >

                                    <div className="flex items-start justify-between gap-4">

                                        <div className="flex items-center gap-4">

                                            {/* AVATAR */}

                                            <div className="w-14 h-14 rounded-full bg-[#089CCE] text-white flex items-center justify-center text-xl font-black">

                                                {client.client_name
                                                    ?.charAt(
                                                        0
                                                    )
                                                    ?.toUpperCase()}

                                            </div>

                                            <div>

                                                <h2 className="text-lg font-bold text-gray-900">

                                                    {
                                                        client.client_name
                                                    }

                                                </h2>

                                                <p className="text-sm text-gray-500 mt-1">

                                                    {
                                                        client.phone_number
                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* INFO */}

                                    <div className="mt-5 space-y-3 text-sm">

                                        <div>
                                            <p className="text-gray-500">
                                                Email
                                            </p>

                                            <p className="font-medium break-all">
                                                {client.email || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">
                                                Address
                                            </p>

                                            <p className="font-medium">
                                                {client.address || "-"}
                                            </p>
                                        </div>

                                    </div>

                                    {/* ACTIONS */}

                                    <div className="mt-6 flex flex-wrap gap-3">

                                        <Link
                                            to={`/clients/${client.id}`}
                                            className="bg-[#089CCE] text-white px-4 py-2 rounded-xl text-sm font-bold"
                                        >
                                            View
                                        </Link>

                                        {client.phone_number && (
                                            <a
                                                href={`https://wa.me/${client.phone_number}`}
                                                target="_blank"
                                                className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
                                            >
                                                WhatsApp
                                            </a>
                                        )}

                                        {client.email && (
                                            <a
                                                href={`mailto:${client.email}`}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
                                            >
                                                Email
                                            </a>
                                        )}

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    client.id
                                                )
                                            }
                                            className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                )}

            </div>

        </DashboardLayout>
    );
}