import { useState } from "react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { createClient } from "@/services/client-service";

export default function CreateClientPage() {
    const navigate = useNavigate();

    const [clientName, setClientName] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [address, setAddress] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleCreate =
        async () => {
            if (!clientName.trim()) {
                alert(
                    "Client name is required"
                );

                return;
            }

            try {
                setLoading(true);

                const client =
                    await createClient({
                        client_name:
                            clientName,
                        phone_number:
                            phoneNumber,
                        email,
                        address,
                    });

                navigate(
                    `/clients/${client.id}`
                );
            } catch (err: any) {
                console.error(err);

                alert(
                    err.message ||
                    "Failed to create client"
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <DashboardLayout>

            <div className="max-w-4xl mx-auto p-6">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-black text-gray-900">
                        Add Client
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create a new litigation
                        client profile.
                    </p>

                </div>

                {/* FORM */}

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">

                    {/* CLIENT NAME */}

                    <div>

                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Client Name
                        </label>

                        <input
                            value={clientName}
                            onChange={(e) =>
                                setClientName(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. Rajesh Kumar"
                            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#089CCE]"
                        />

                    </div>

                    {/* PHONE */}

                    <div>

                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Phone Number
                        </label>

                        <input
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. 9876543210"
                            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#089CCE]"
                        />

                    </div>

                    {/* EMAIL */}

                    <div>

                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. client@gmail.com"
                            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#089CCE]"
                        />

                    </div>

                    {/* ADDRESS */}

                    <div>

                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Address
                        </label>

                        <textarea
                            rows={4}
                            value={address}
                            onChange={(e) =>
                                setAddress(
                                    e.target.value
                                )
                            }
                            placeholder="Client residential or office address..."
                            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#089CCE]"
                        />

                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center gap-4 pt-4">

                        <button
                            onClick={
                                handleCreate
                            }
                            disabled={loading}
                            className="bg-[#089CCE] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#078bb8] transition disabled:opacity-50"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Client"}
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/clients"
                                )
                            }
                            className="border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}