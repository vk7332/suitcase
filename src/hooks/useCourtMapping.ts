import { useState } from "react";
import courtsData from "../data/courts/courts.json";

export function useCourtMapping() {
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [court, setCourt] = useState("");

    const states = Object.keys(courtsData);

    const districts =
        state && courtsData[state as keyof typeof courtsData]
            ? Object.keys(courtsData[state].districts)
            : [];

    const courts =
        state && district
            ? courtsData[state].districts[district].courts
            : [];

    return {
        state,
        district,
        court,
        states,
        districts,
        courts,
        setState,
        setDistrict,
        setCourt,
    };
}
