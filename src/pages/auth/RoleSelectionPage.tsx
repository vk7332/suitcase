import { useNavigate } from "react-router-dom";
import StepRole from "@/pages/onboarding/StepRole";

export default function RoleSelectionPage() {
    const navigate = useNavigate();

    const handleRoleSelect = (role: string) => {
        sessionStorage.setItem("selectedRole", role);
        navigate("/signup");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#089CCE] p-6">
            <StepRole next={handleRoleSelect} />
        </div>
    );
}