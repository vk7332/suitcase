import { useOnboarding } from "@/hooks/useOnboarding";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
    const { step, updateStep, complete } = useOnboarding();
    const navigate = useNavigate();

    const createFirstCase = async () => {
        await fetch("/api/case/create", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "My First Case",
                type: "civil",
            }),
        });
    };

    return (
        <div className="p-10">

            {step === 1 && (
                <div>
                    <h2>Create Chamber</h2>
                    <button onClick={() => updateStep(2)}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Add Team Members</h2>
                    <button onClick={() => updateStep(3)}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Create First Case</h2>

                    <button
                        onClick={async () => {
                            await createFirstCase(); // ✅ auto-create
                            updateStep(4);
                        }}
                    >
                        Create & Continue
                    </button>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h2>Setup Complete 🎉</h2>

                    <button
                        onClick={() => {
                            complete();
                            navigate("/dashboard");
                        }}
                    >
                        Go to Dashboard
                    </button>
                </div>
            )}

        </div>
    );
}