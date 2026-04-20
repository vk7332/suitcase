import React from "react";
import { generateLegalPDF } from "../../utils/generateLegalPDF";

const termsContent = `
TERMS AND CONDITIONS
SUITCASE – Court Fee & Case Manager Suite

Effective Date: ${new Date().toLocaleDateString()}

1. DEVELOPER INFORMATION
Name: Vipin Kumar
Email: vk7332@gmail.com
Phone: 7018064385
Advocate Enrollment Number: HIM/75/2012

2. INTRODUCTION
These Terms and Conditions govern the use of the SUITCASE application. By accessing or using this application, you agree to comply with these terms.

3. USE OF THE APPLICATION
Users agree to:
• Provide accurate information.
• Use the application for lawful purposes only.
• Maintain confidentiality of login credentials.
• Avoid misuse or unauthorized access.

4. PROFESSIONAL DISCLAIMER
SUITCASE provides tools for assistance only and does not constitute legal advice.

Court Fee Disclaimer:
The calculators built on this application are not final but subject to confirmation from the relevant courts as per applicable provisions. The publisher is not liable for any discrepancy.

5. SUBSCRIPTIONS AND PAYMENTS
• Certain features require a paid subscription.
• Payments are securely processed via Razorpay.
• Subscription fees are non-refundable unless required by law.

6. INTELLECTUAL PROPERTY RIGHTS
All content, trademarks, and software are the intellectual property of SUITCASE. Unauthorized reproduction or distribution is prohibited.

7. THIRD-PARTY SERVICES
This application may integrate with:
• Supabase
• Razorpay
• Google Play Services
• Amazon Affiliate Program
• eCourts Services

We are not responsible for the policies or content of third-party services.

8. LIMITATION OF LIABILITY
We shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this application.

9. TERMINATION
We reserve the right to suspend or terminate user accounts that violate these terms.

10. GOVERNING LAW AND JURISDICTION
These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Himachal Pradesh, India.

11. PRIVACY POLICY
Use of this application is also governed by our Privacy Policy.

12. CONTACT INFORMATION
Vipin Kumar
Email: vk7332@gmail.com
Phone: 7018064385

© ${new Date().getFullYear()} SUITCASE – Court Fee & Case Manager Suite. All rights reserved.
`;

const TermsConditionsPage: React.FC = () => {
    const handleDownload = () => {
        generateLegalPDF(
            "Terms and Conditions - SUITCASE",
            termsContent
        );
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                Terms & Conditions
            </h1>

            <button
                onClick={handleDownload}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            >
                📄 Download PDF
            </button>

            <div className="space-y-4 text-gray-700 leading-relaxed">
                {termsContent.split("/n").map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
};

export default TermsConditionsPage;


