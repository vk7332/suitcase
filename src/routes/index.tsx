import { Routes, Route } from "react-router-dom";
// import '@/styles/global.css';
// 🔐 Auth
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import RoleSelectionPage from "@/pages/auth/RoleSelectionPage";

// 📊 Dashboard (adjust if needed)
import LegalDashboard from "@/pages/dashboard/LegalDashboard";
import SubscriptionGuard from "@/components/auth/SubscriptionGuard";

// 🧮 Calculator Pages (WRAPPERS ONLY)
import CourtFeesPage from "@/pages/calculators/CourtFeesPage";
import FilingCostPage from "@/pages/calculators/FilingCostPage";
import InterestPage from "@/pages/calculators/InterestPage";
import LimitationPage from "@/pages/calculators/LimitationPage";
import StampDutyPage from "@/pages/calculators/StampDutyPage";
import TotalCaseCostPage from "@/pages/calculators/TotalCaseCostPage";
import PartitionSuitPage from "@/pages/calculators/PartitionSuitCalculator";
import SpecificPerformancePage from "@/pages/calculators/SpecificPerformanceCalculator";

// 📦 Other Modules (adjust paths if needed)
import ClientsPage from "@/pages/clients/ClientsPage";
import InvoiceListPage from "@/pages/invoices/InvoiceListPage";
import CreateInvoicePage from "@/pages/invoices/CreateInvoicePage";
import GSTInvoicePage from "@/pages/invoices/GstInvoicePage";
import ClientLedgerPage from "@/pages/ledger/ClientLedgerPage";
import DraftLibraryPage from "@/pages/draftlibrary/DraftLibraryPage";
import AIDraftPage from "@/pages/aidraft/AiDraftPage";
import CauseListPage from "@/pages/causelist/CauseListPage";
import ReportsPage from "@/pages/Reports";
import PublicLoginPage from "@/pages/portal/PublicLoginPage";
import CalendarPage from "@/pages/calendar/CalendarPage";
import { SettingsPage } from "@/pages/SettingsPage";
import ProfileSettingsPage from "@/pages/profile/ProfileSettingsPage";

//  Admin Pages
import SubscriptionPage from "@/pages/subscription/SubscriptionPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdvocateDashboard from "@/pages/advocate/Dashboard";
import JuniorAdvocateDashboard from "@/pages/junior-advocate/Dashboard";
import StaffDashboard from "@/pages/staff/Dashboard";
import LitigantDashboard from "@/pages/litigant/Dashboard";
import PublicDashboard from "@/pages/public/Dashboard";
import RoleDashboardRedirect from "@/pages/dashboard/RoleDashboardRedirect";

//  Advocate Pages
import Clients from "@/pages/clients/ClientsPage";
import Cases from "@/pages/cases/CasesPage";
import CaseTimeline from "@/components/cases/CaseTimeline";
import Fees from "@/pages/invoices/InvoiceListPage";

import ECourtsHubPage from "@/pages/ecourts/eCourtsHubPage";

import ProtectedRoute from "@/components/ProtectedRoute";
import ClientCaseDetails from "@/pages/client/ClientCaseDetails";
import ClientDashboard from "@/pages/client/ClientDashboard";
import NotificationPreferences from "@/pages/client/NotificationPreferences";
import Landing from "@/pages/Landing";
import Pricing from "@/pages/Pricing";
import ContactUs from "@/pages/ContactUs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Onboarding from "@/pages/onboarding/index";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentFailed from "@/pages/PaymentFailed";
import AffiliateDashboard from "@/pages/affiliate/AffiliateDashboard";
import CreateCasePage from "@/pages/cases/CreateCasePage";
import CaseDetailsPage from "@/pages/cases/CaseDetailsPage";

// ❌ 404 Page (create if missing)
const NotFound = () => <div>404 - Page Not Found</div>;

export default function AppRoutes() {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/role-selection" element={<RoleSelectionPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/settings/profile" element={<ProfileSettingsPage />} />

            {/* ADMIN */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute role="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            {/* ADVOCATE */}
            <Route
                path="/advocate"
                element={
                    <ProtectedRoute role="advocate">
                        <AdvocateDashboard />
                    </ProtectedRoute>
                }
            />

            {/* JUNIOR ADVOCATE */}
            <Route
                path="/junior-advocate"
                element={
                    <ProtectedRoute role="junior advocates">
                        <JuniorAdvocateDashboard />
                    </ProtectedRoute>
                }
            />

            {/* STAFF / CLERK */}
            <Route
                path="/staff"
                element={
                    <ProtectedRoute role="staff(clerks)">
                        <StaffDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
    path="/profile"
    element={
        <ProtectedRoute>
            <ProfileSettingsPage />
        </ProtectedRoute>
    }
/>
<Route
    path="/settings/profile"
    element={<ProfileSettingsPage />}
/>
            <Route
                path="/advocate/clients"
                element={
                    <ProtectedRoute allowedRoles={["advocate", "junior advocates", "staff(clerks)"]}>
                        <Clients />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/advocate/cases"
                element={
                    <ProtectedRoute allowedRoles={["advocate", "junior advocates", "staff(clerks)", "litigant"]}>
                        <Cases />
                    </ProtectedRoute>
                }
            />
            <Route
    path="/advocate/cases/create"
    element={<CreateCasePage />}
/>

<Route
    path="/advocate/cases/:id"
    element={<CaseDetailsPage />}
/>
            <Route
                path="/ecourts"
                element={<ECourtsHubPage />}
            />
            <Route
                path="/cases/create"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "advocate",
                            "junior advocates",
                            "staff(clerks)"
                        ]}
                    >
                        <CreateCasePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/advocate/fees"
                element={
                    <ProtectedRoute allowedRoles={["advocate", "staff(clerks)"]}>
                        <Fees />
                    </ProtectedRoute>
                }
            />

            {/* CLIENT */}
            <Route
                path="/client"
                element={
                    <ProtectedRoute role="client">
                        <ClientDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/client/case/:id"
                element={
                    <ProtectedRoute role="client">
                        <ClientCaseDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/client/preferences"
                element={<NotificationPreferences />}
            />

            {/* LITIGANT */}
            <Route
                path="/litigant"
                element={
                    <ProtectedRoute role="litigant">
                        <LitigantDashboard />
                    </ProtectedRoute>
                }
            />

            {/* PUBLIC ROLE */}
            <Route
                path="/public"
                element={
                    <ProtectedRoute role="public">
                        <PublicDashboard />
                    </ProtectedRoute>
                }
            />

            {/* AFFILIATE */}
            <Route
                path="/affiliate"
                element={
                    <ProtectedRoute role="affiliate">
                        <AffiliateDashboard />
                    </ProtectedRoute>
                }
            />

            {/* DASHBOARD & CORE */}
            <Route
                path="/dashboard"
                element={
                    <SubscriptionGuard>
                        <RoleDashboardRedirect />
                    </SubscriptionGuard>
                }
            />
            <Route path="/legal-dashboard" element={<LegalDashboard />} />

            {/* MODULES */}
            <Route
                path="/clients"
                element={
                    <ProtectedRoute allowedRoles={["advocate", "junior advocates", "staff(clerks)"]}>
                        <ClientsPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/invoices" element={<InvoiceListPage />} />
            <Route path="/invoices/create" element={<CreateInvoicePage />} />
            <Route path="/invoices/gst" element={<GSTInvoicePage />} />
            <Route path="/ledger" element={<ClientLedgerPage />} />

            {/* CALCULATORS */}
            <Route path="/calculator/court-fee" element={<CourtFeesPage />} />
            <Route path="/calculator/filing-cost" element={<FilingCostPage />} />
            <Route path="/calculator/interest" element={<InterestPage />} />
            <Route path="/calculator/limitation" element={<LimitationPage />} />
            <Route path="/calculator/stamp-duty" element={<StampDutyPage />} />
            <Route path="/calculator/total-case-cost" element={<TotalCaseCostPage />} />
            <Route path="/calculator/partition-suit" element={<PartitionSuitPage />} />
            <Route path="/calculator/specific-performance" element={<SpecificPerformancePage />} />

            {/* NEW ROUTES */}
            <Route path="/drafts" element={<DraftLibraryPage />} />
            <Route path="/ai-draft" element={<AIDraftPage />} />
            <Route path="/cause-list" element={<CauseListPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/portal" element={<PublicLoginPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* ❌ FALLBACK */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
 
