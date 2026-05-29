import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase-client";

export default function Cases() {
    const [cases, setCases] = useState<any[]>([]);
    const [title, setTitle] = useState("");

    const loadCases = async () => {
        const { data } = await supabase.from("cases").select("*");
        setCases(data || []);
    };

    const addCase = async () => {
        await supabase.from("cases").insert({ title });
        setTitle("");
        loadCases();
    };

    const deleteCase = async (id: string) => {
        await supabase.from("cases").delete().eq("id", id);
        loadCases();
    };

    useEffect(() => {
        loadCases();
    }, []);

    return (
        <div>
            <h2>Cases</h2>

            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={addCase}>Add Case</button>

            {cases.map((c) => (
                <div key={c.id}>
                    {c.title}
                    <button onClick={() => deleteCase(c.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
