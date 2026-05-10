import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function Documents() {
    const [docs, setDocs] = useState<any[]>([]);

    useEffect(() => {
        const fetchDocs = async () => {
            const { data } = await supabase.from("documents").select("*");
            setDocs(data || []);
        };

        fetchDocs();
    }, []);

    const handleView = async (id: string) => {
        const res = await fetch(`/api/document/${id}`);
        const data = await res.json();

        if (data.url) {
            window.open(data.url, "_blank");
        } else {
            alert(data.error);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Documents</h2>

            {docs.map((doc) => (
                <div key={doc.id}>
                    <p>{doc.file_name}</p>

                    <button onClick={() => handleView(doc.id)}>
                        Secure View
                    </button>

                    <button
                        onClick={() =>
                            window.open(`/api/audit/pdf/${doc.id}`, "_blank")
                        }
                    >
                        Download Audit Report
                    </button>
                </div>
            ))}
        </div>
    );
}
