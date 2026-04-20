import { createBrowserRouter } from "react-router-dom";

// 🔐 Auth
import LoginPage from "@/pages/auth/login-page";

// 📊 Dashboard (adjust if needed)
import LegalDashboard from "@/pages/dashboard/legaldashboard";

// 🧮 Calculator Pages (WRAPPERS ONLY)
import CourtFeesPage from "@/pages/calculators/court-fees-page";
import FilingCostPage from "@/pages/calculators/filing-cost-page";
import InterestPage from "@/pages/calculators/interest-page";
import LimitationPage from "@/pages/calculators/limitation-page";
import StampDutyPage from "@/pages/calculators/stamp-duty-page";
import TotalCaseCostPage from "@/pages/calculators/total-case-cost-page";
import PartitionSuitPage from "@/pages/calculators/partition-suit-page";

// 📦 Other Modules (adjust paths if needed)
import ClientsPage from "@/pages/clients/clients-page";
import InvoiceListPage from "@/pages/invoices/invoice-list-page";
import CreateInvoicePage from "@/pages/invoices/create-invoice-page";
import GSTInvoicePage from "@/pages/invoices/gstinvoicepage";
import ClientLedgerPage from "@/pages/ledger/client-ledger-page";
import ProtectedRoute from "./protectedroute";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//  Admin Pages
import SubscriptionPage from "@/pages/subscription/subscription-page";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import AdvocateDashboard from "@/pages/advocate/dashboard";

//  Advocate Pages
import Clients from "@/pages/advocate/clients";
import Cases from "@/pages/advocate/cases";
import Fees from "@/pages/advocate/fees";


import ProtectedRoute from "@/components/ProtectedRoute";
import ClientCaseDetails from "@/pages/client/client-case-details";
import ClientDashboard from "@/pages/client/client-dashboard";

// ❌ 404 Page (create if missing)
const NotFound = () => <div>404 - Page Not Found</div>;

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* PUBLIC */}
                <Route path="/subscription" element={<SubscriptionPage />} />

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
                    path="/advocate/fees"
                    element={
                        <ProtectedRoute role="advocate">
                            <Fees />
                        </ProtectedRoute>
                    }
                />

            </Routes>

            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/case/:id" element={<ClientCaseDetails />} />
        </BrowserRouter>
    );
}

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/",
        element: <LegalDashboard />,
    },

    // 📊 Core Modules
    {
        path: "/clients",
        element: (
            <ProtectedRoute allowedRoles={["advocate", "staff"]}>
                <ClientsPage />
            </ProtectedRoute>
        ),
    },

    {
        path: "/invoices/create",
        element: <CreateInvoicePage />,
    },
    {
        path: "/invoices/gst",
        element: <GSTInvoicePage />,
    },
    {
        path: "/ledger",
        element: <ClientLedgerPage />,
    },

    // 🧮 Calculators
    {
        path: "/calculator/court-fee",
        element: <CourtFeesPage />,
    },
    {
        path: "/calculator/filing-cost",
        element: <FilingCostPage />,
    },
    {
        path: "/calculator/interest",
        element: <InterestPage />,
    },
    {
        path: "/calculator/limitation",
        element: <LimitationPage />,
    },
    {
        path: "/calculator/stamp-duty",
        element: <StampDutyPage />,
    },
    {
        path: "/calculator/total-case-cost",
        element: <TotalCaseCostPage />,
    },
    {
        path: "/calculator/partition-suit",
        element: <PartitionSuitPage />,
    },

    // ❌ Fallback
    {
        path: "*",
        element: <NotFound />,
    },
]); 