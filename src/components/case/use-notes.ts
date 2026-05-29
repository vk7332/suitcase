import { useState } from "react";

export const useNotes = () => {
    const [notes, setNotes] = useState<string[]>([]);

    const addNote = (text: string) => {
        if (!text || text.length > 200) return;

        setNotes((prev) => [...prev, text]);
    };

    const clearNotes = () => setNotes([]);

    return { notes, addNote, clearNotes };
};
