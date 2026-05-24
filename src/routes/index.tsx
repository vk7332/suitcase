import { Routes, Route } from "react-router-dom";
// import '@/styles/global.css';
// 🔐 Auth
import LoginPage from "@/pages/Auth/login-page";
import SignupPage from "@/pages/Auth/signup-page";

// 📊 Dashboard (adjust if needed)
import LegalDashboard from "@/pages/Dashboard/LegalDashboard";
import SubscriptionGuard from "@/components/auth/subscription-guard";

// 🧮 Calculator Pages (WRAPPERS ONLY)
import CourtFeesPage from "@/pages/calculators/court-fees-page";
import FilingCostPage from "@/pages/calculators/filing-cost-page";
import InterestPage from "@/pages/calculators/interest-page";
import LimitationPage from "@/pages/calculators/limitation-page";
import StampDutyPage from "@/pages/calculators/stamp-duty-page";
import TotalCaseCostPage from "@/pages/calculators/total-case-cost-page";
import PartitionSuitPage from "@/pages/calculators/partition-suit-calculator";
import SpecificPerformancePage from "@/pages/calculators/specific-performance-calculator";

// 📦 Other Modules (adjust paths if needed)
import ClientsPage from "@/pages/Clients/clients-page";
import InvoiceListPage from "@/pages/Invoices/invoice-list-page";
import CreateInvoicePage from "@/pages/Invoices/create-invoice-page";
import GSTInvoicePage from "@/pages/Invoices/GSTInvoicePage";
import ClientLedgerPage from "@/pages/Ledger/client-ledger-page";
import DraftLibraryPage from "@/pages/DraftLibrary/DraftLibraryPage";
import AIDraftPage from "@/pages/AIDraft/AIDraftPage";
import CauseListPage from "@/pages/CauseList/CauseListPage";
import ReportsPage from "@/pages/Reports";
import PublicLoginPage from "@/pages/Portal/public-login-page";
import CalendarPage from "@/pages/Calendar/CalendarPage";
import { SettingsPage } from "@/pages/SettingsPage";

//  Admin Pages
import SubscriptionPage from "@/pages/Subscription/subscription-page";
import AdminDashboard from "@/pages/Admin/admin-dashboard";
import AdvocateDashboard from "@/pages/advocate/dashboard";

//  Advocate Pages
import Clients from "@/pages/Clients/clients-page";
import Cases from "@/pages/Cases/CasesPage";
import CaseDetails from "@/pages/Cases/case-details";
import Fees from "@/pages/Invoices/invoice-list-page";


import ProtectedRoute from "@/components/ProtectedRoute";
import ClientCaseDetails from "@/pages/client/client-case-details";
import ClientDashboard from "@/pages/client/client-dashboard";
import NotificationPreferences from "@/pages/client/notification-preferences";
import Dashboard from "@/pages/Dashboard";
import Landing from "@/pages/landing";
import Pricing from "@/pages/pricing";
import ContactUs from "@/pages/contact-us";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Onboarding from "@/pages/onboarding";
import PaymentSuccess from "@/pages/payment-success";
import PaymentFailed from "@/pages/payment-failed";

// ❌ 404 Page (create if missing)
const NotFound = () => <div>404 - Page Not Found</div>;

export default function AppRoutes() {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />

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

            <Route
                path="/advocate/clients"
                element={
                    <ProtectedRoute role="advocate">
                        <Clients />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/advocate/cases"
                element={
                    <ProtectedRoute role="advocate">
                        <Cases />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/advocate/cases/:id"
                element={
                    <ProtectedRoute role="advocate">
                        <CaseDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/advocate/fees"
                element={
                    <ProtectedRoute role="advocate">
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

            {/* DASHBOARD & CORE */}
            <Route
                path="/dashboard"
                element={
                    <SubscriptionGuard>
                        <Dashboard />
                    </SubscriptionGuard>
                }
            />
            <Route path="/legal-dashboard" element={<LegalDashboard />} />

            {/* MODULES */}
            <Route
                path="/clients"
                element={
                    <ProtectedRoute allowedRoles={["advocate", "staff"]}>
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
 
