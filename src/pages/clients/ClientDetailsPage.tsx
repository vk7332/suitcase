import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { supabase } from "@/utils/supabase/supabase-client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
    deleteClient,
    getClientById,
} from "@/services/client-service";


export default function ClientDetailsPage() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [client, setClient] =
        useState<any>(null);

    const [cases, setCases] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        if (id) {
            loadClient();
        }
    }, [id]);

    const loadClient =
        async () => {
            try {
                setLoading(true);

                const clientData =
                    await getClientById(
                        id as string
                    );

                setClient(clientData);

                const {
                    data: casesData,
                } = await supabase
                    .from("cases")
                    .select("*")
                    .eq(
                        "client_id",
                        id
                    )
                    .order(
                        "created_at",
                        {
                            ascending: false,
                        }
                    );

                setCases(
                    casesData || []
                );
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

    const handleDelete =
        async () => {
            const confirmed = confirm(
                "Delete this client?"
            );

            if (!confirmed) return;

            try {
                await deleteClient(
                    id as string
                );

                navigate("/clients");
            } catch (err: any) {
                console.error(err);

                alert(
                    err.message ||
                    "Failed to delete client"
                );
            }
        };

    if (loading) {
        return (
            <DashboardLayout>

                <div className="p-6">
                    Loading...
                </div>

            </DashboardLayout>
        );
    }

    if (!client) {
        return (
            <DashboardLayout>

                <div className="p-6">
                    Client not found
                </div>

            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="max-w-7xl mx-auto p-6 space-y-8">

                {/* HEADER */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                        <div className="flex items-start gap-5">

                            {/* AVATAR */}

                            <div className="w-20 h-20 rounded-full bg-[#089CCE] text-white flex items-center justify-center text-3xl font-black shrink-0">

                                {client.client_name
                                    ?.charAt(0)
                                    ?.toUpperCase()}

                            </div>

                            {/* INFO */}

                            <div>

                                <h1 className="text-4xl font-black text-gray-900">

                                    {
                                        client.client_name
                                    }

                                </h1>

                                <p className="text-gray-500 mt-2">
                                    Litigation Client
                                </p>

                                <div className="mt-5 space-y-2 text-sm">

                                    <p>
                                        <span className="font-bold">
                                            Phone:
                                        </span>{" "}
                                        {client.phone_number || "-"}
                                    </p>

                                    <p>
                                        <span className="font-bold">
                                            Email:
                                        </span>{" "}
                                        {client.email || "-"}
                                    </p>

                                    <p>
                                        <span className="font-bold">
                                            Address:
                                        </span>{" "}
                                        {client.address || "-"}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ACTIONS */}

                        <div className="flex flex-wrap gap-3">

                            {client.phone_number && (
                                <a
                                    href={`https://wa.me/${client.phone_number}`}
                                    target="_blank"
                                    className="bg-green-600 text-white px-5 py-3 rounded-2xl font-bold"
                                >
                                    WhatsApp
                                </a>
                            )}

                            {client.email && (
                                <a
                                    href={`mailto:${client.email}`}
                                    className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold"
                                >
                                    Email
                                </a>
                            )}

                            <button
                                onClick={
                                    handleDelete
                                }
                                className="bg-red-50 text-red-600 px-5 py-3 rounded-2xl font-bold"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

                {/* CASES */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                        <div>

                            <h2 className="text-2xl font-bold text-gray-900">
                                Linked Cases
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Litigation matters associated
                                with this client.
                            </p>

                        </div>

                        <Link
                            to="/advocate/cases/create"
                            className="bg-[#089CCE] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#078bb8]"
                        >
                            Create New Case
                        </Link>

                    </div>

                    {cases.length === 0 ? (
                        <div className="border border-dashed border-gray-300 rounded-3xl p-12 text-center bg-gray-50">

                            <h3 className="text-xl font-bold text-gray-800">
                                No linked cases
                            </h3>

                            <p className="text-gray-500 mt-3">
                                Create litigation matters
                                connected to this client.
                            </p>

                        </div>
                    ) : (
                        <div className="space-y-4">

                            {cases.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/advocate/cases/${item.id}`}
                                    className="block border border-gray-100 rounded-2xl p-5 hover:border-[#089CCE] hover:shadow-sm transition"
                                >

                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                        <div>

                                            <h3 className="font-bold text-lg text-gray-900">

                                                {
                                                    item.case_title
                                                }

                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">

                                                {
                                                    item.case_number
                                                }

                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">

                                                {
                                                    item.court_name
                                                }

                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <div className="text-sm font-bold text-[#089CCE] uppercase">

                                                {
                                                    item.status
                                                }

                                            </div>

                                            <div className="text-sm text-gray-500 mt-1">

                                                {new Date(
                                                    item.created_at
                                                ).toLocaleDateString()}

                                            </div>

                                        </div>

                                    </div>

                                </Link>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </DashboardLayout>
    );
}