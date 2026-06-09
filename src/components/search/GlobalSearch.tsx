import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    searchCases,
    searchClients,
} from "@/services/global-search-service";

export default function GlobalSearch() {
    const [query, setQuery] =
        useState("");

    const [cases, setCases] =
        useState<any[]>([]);

    const [clients, setClients] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setCases([]);
            setClients([]);
            return;
        }

        const delay =
            setTimeout(() => {
                runSearch();
            }, 300);

        return () =>
            clearTimeout(delay);
    }, [query]);

    const runSearch =
        async () => {
            try {
                setLoading(true);

                const [
                    caseResults,
                    clientResults,
                ] = await Promise.all([
                    searchCases(query),
                    searchClients(query),
                ]);

                setCases(caseResults);

                setClients(clientResults);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="relative w-full max-w-2xl">

            {/* SEARCH INPUT */}

            <input
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
                placeholder="Search cases, clients, courts..."
                className="w-full border border-gray-200 bg-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#089CCE] shadow-sm"
            />

            {/* RESULTS */}

            {query.trim() && (
                <div className="absolute z-50 top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden">

                    {loading ? (
                        <div className="p-6 text-gray-500">
                            Searching...
                        </div>
                    ) : (
                        <div className="max-h-[500px] overflow-y-auto">

                            {/* CASES */}

                            <div className="p-5 border-b border-gray-100">

                                <h3 className="text-sm font-black uppercase tracking-wide text-gray-500 mb-4">
                                    Cases
                                </h3>

                                {cases.length === 0 ? (
                                    <p className="text-sm text-gray-400">
                                        No matching cases
                                    </p>
                                ) : (
                                    <div className="space-y-3">

                                        {cases.map(
                                            (
                                                item
                                            ) => (
                                                <Link
                                                    key={
                                                        item.id
                                                    }
                                                    to={`/advocate/cases/${item.id}`}
                                                    className="block border border-gray-100 rounded-2xl p-4 hover:border-[#089CCE] hover:bg-gray-50 transition"
                                                >

                                                    <h4 className="font-bold text-gray-900">

                                                        {
                                                            item.case_title
                                                        }

                                                    </h4>

                                                    <p className="text-sm text-gray-500 mt-1">

                                                        {
                                                            item.case_number
                                                        }

                                                    </p>

                                                    <p className="text-sm text-gray-500">

                                                        {
                                                            item.court_name
                                                        }

                                                    </p>

                                                </Link>
                                            )
                                        )}

                                    </div>
                                )}

                            </div>

                            {/* CLIENTS */}

                            <div className="p-5">

                                <h3 className="text-sm font-black uppercase tracking-wide text-gray-500 mb-4">
                                    Clients
                                </h3>

                                {clients.length === 0 ? (
                                    <p className="text-sm text-gray-400">
                                        No matching clients
                                    </p>
                                ) : (
                                    <div className="space-y-3">

                                        {clients.map(
                                            (
                                                client
                                            ) => (
                                                <Link
                                                    key={
                                                        client.id
                                                    }
                                                    to={`/clients/${client.id}`}
                                                    className="block border border-gray-100 rounded-2xl p-4 hover:border-[#089CCE] hover:bg-gray-50 transition"
                                                >

                                                    <h4 className="font-bold text-gray-900">

                                                        {
                                                            client.client_name
                                                        }

                                                    </h4>

                                                    <p className="text-sm text-gray-500 mt-1">

                                                        {
                                                            client.phone_number
                                                        }

                                                    </p>

                                                    <p className="text-sm text-gray-500 break-all">

                                                        {
                                                            client.email
                                                        }

                                                    </p>

                                                </Link>
                                            )
                                        )}

                                    </div>
                                )}

                            </div>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}