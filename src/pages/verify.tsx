import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/api";

const handleUpload = async (e: any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/verify/upload", formData);

    setData(res.data);
};

const VerifyPage = () => {
    const [params] = useSearchParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const hash = params.get("hash");

        api.get(`/verify?hash=${hash}`).then((res) => {
            setData(res.data);
        });
    }, []);

    if (!data) return <p>Verifying...</p>;

    return (
        <div>
            <h2>Document Verification</h2>

            <p>Status: {data.status}</p>
            <p>Signed By: {data.signedBy}</p>
            <p>Hash: {data.hash}</p>

            <p>Date: {new Date(data.createdAt).toLocaleString()}</p>

            {data.txHash && (
                <p>
                    Blockchain:
                    <a
                        href={`https://polygonscan.com/tx/${data.txHash}`}
                        target="_blank"
                    >
                        View Transaction
                    </a>
                </p>
            )}
        </div>
    );
};

export default VerifyPage;