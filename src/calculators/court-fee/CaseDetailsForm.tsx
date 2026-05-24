import { useState, useEffect } from "react";
import { calculateCourtFee } from "../../engines/courtFee/CourtFeeCalculatorEngine";
import FeeBreakdown from "./FeeBreakdown";
import { generateCourtFeePDF } from "../../engines/pdf/courtFeePdf.engine";
import { getProfile } from "../../services/ProfileService";
import { useAuth } from "../../hooks/useAuth";

export default function CaseDetailsForm() {
    const [suitValue, setSuitValue] = useState(0);
    const [suitType, setSuitType] = useState("money");
    const [state, setState] = useState("HP");
    const [options, setOptions] = useState({});
    const [result, setResult] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);

    // 🧮 CALCULATE
    const handleCalculate = () => {
        const res = calculateCourtFee({
            suitValue,
            suitType,
            state,
            ...options,
        });

        setResult(res);
    };

    // 📄 PDF EXPORT
    const handlePDF = () => {
        generateCourtFeePDF({
            suitValue,
            suitType,
            state,
            result,
        });
    };

    return (
        <div className="p-4 border">

            <h2 className="font-bold mb-3">
                Court Fee Calculator
            </h2>

            {/* STATE */}
            <select
                className="border p-2 w-full mb-2"
                value={state}
                onChange={(e) => setState(e.target.value)}
            >
                <option value="HP">Himachal Pradesh</option>
                <option value="PB">Punjab</option>
                <option value="HR">Haryana</option>
                <option value="DL">Delhi</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="RJ">Rajasthan</option>
            </select>

            {/* SUIT TYPE */}
            <select
                className="border p-2 w-full mb-2"
                value={suitType}
                onChange={(e) => setSuitType(e.target.value)}
            >
                <option value="money">Money Suit</option>
                <option value="declaration">Declaration</option>
                <option value="general">General</option>
            </select>

            {/* VALUE */}
            <input
                type="number"
                placeholder="Suit Value"
                className="border p-2 w-full mb-2"
                onChange={(e) =>
                    setSuitValue(Number(e.target.value))
                }
            />

            {/* TOGGLES */}
            <div className="space-y-1 mb-3 text-sm">

                <label>
                    <input
                        type="checkbox"
                        checked={options.includeFiling}
                        onChange={(e) =>
                            setOptions({
                                ...options,
                                includeFiling: e.target.checked,
                            })
                        }
                    />
                    Filing Fee
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={options.includeApplication}
                        onChange={(e) =>
                            setOptions({
                                ...options,
                                includeApplication: e.target.checked,
                            })
                        }
                    />
                    Application Fee
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={options.includeNotary}
                        onChange={(e) =>
                            setOptions({
                                ...options,
                                includeNotary: e.target.checked,
                            })
                        }
                    />
                    Notary Fee
                </label>

            </div>

            {/* BUTTONS */}
            <button
                onClick={handleCalculate}
                className="bg-blue-600 text-white p-2 w-full mb-2"
            >
                Calculate
            </button>

            {result && (
                <button
                    onClick={handlePDF}
                    className="bg-green-600 text-white p-2 w-full mb-2"
                >
                    Export PDF
                </button>
            )}

            {/* RESULT */}
            <FeeBreakdown result={result} />

        </div>
    );
}


