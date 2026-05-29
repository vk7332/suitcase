import { useProfile } from "../../hooks/use-profile";
import { generateCombinedLegalPDF } from "../../utils/generate-combined-legal-pdf";

const LegalDocumentsPage: React.FC = () => {
    const { profile } = useProfile();

    const handleDownload = async () => {
        if (!profile) {
            alert("Please complete your profile first.");
            return;
        }

        await generateCombinedLegalPDF({
            name: profile.full_name,
            enrollmentNumber: profile.enrollment_number,
            email: profile.email,
            phone: profile.phone,
            chamberName: profile.chamber_name,
            website: profile.website,
            logoUrl: profile.logo_url,
            signatureUrl: profile.signature_url,
        });
    };

    return (
        <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-6 py-3 rounded"
        >
            Download Branded Legal PDF
        </button>
    );
};


