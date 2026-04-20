import React from "react";

interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
}

function Table<T extends Record<string, any>>({
    data,
    columns,
}: TableProps<T>) {
    return (
        <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="p-2 border">
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {columns.map((col, j) => (
                            <td key={j} className="p-2 border">
                                {row[col.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;


