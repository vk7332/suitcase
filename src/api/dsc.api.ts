export const signWithDSC = async (hash: string) => {
    const res = await fetch("http://localhost:1580/sign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ hash }),
    });

    return res.json();
};