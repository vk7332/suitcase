export function exportJSON(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    link.click();
}

export function exportCSV(data: any[], filename: string) {
    if (!data.length) return;

    const headers = Object.keys(data[0]);

    const csvRows = [
        headers.join(","),
        ...data.map((row) =>
            headers.map((field) => `"${row[field]}"`).join(",")
        ),
    ];

    const blob = new Blob([csvRows.join("/n")], {
        type: "text/csv",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
}


