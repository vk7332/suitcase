import { useState } from "react";

export default function SearchBar({ onSearch }: any) {
    const [query, setQuery] = useState("");

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search Clients / Cases..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border p-2 w-80"
            />

            <button
                onClick={() => onSearch(query)}
                className="bg-blue-600 text-white p-2 ml-2"
            >
                Search
            </button>
        </div>
    );
}
