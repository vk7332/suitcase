import { useState } from "react";
import { useCourtMapping } from "../../hooks/use-court-mapping";

export default function CourtSelector() {
    const {
        state,
        district,
        court,
        states,
        districts,
        courts,
        setState,
        setDistrict,
        setCourt,
    } = useCourtMapping();

    return (
        <div>
            <select onChange={(e) => setState(e.target.value)} value={state}>
                <option value="">Select State</option>
                {states.map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}
            </select>


            <select
                onChange={(e) => setState(e.target.value)}
                className="border p-2 w-full"
            >
                <option value="HP">Himachal Pradesh</option>
                <option value="PB">Punjab</option>
                <option value="HR">Haryana</option>
                <option value="DL">Delhi</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="RJ">Rajasthan</option>
            </select>

            {state && (
                <select
                    onChange={(e) => setDistrict(e.target.value)}
                    value={district}
                >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            )}
            {district && (
                <select
                    onChange={(e) => setCourt(e.target.value)}
                    value={court}
                >
                    <option value="">Select Court</option>
                    {courts.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            )}

        </div>
    );
}




