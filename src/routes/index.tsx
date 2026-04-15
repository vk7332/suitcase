import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import { ROLES } from "@/types/roles";

// Lazy-loaded pages
const LoginPage = lazy(() => import("@/pages/Auth/login-page"));
const LegalDashboard = lazy(() => import("@/pages/Dashboard/LegalDashboard"));
const ClientsPage = lazy(() => import("@/pages/Clients/clients-page"));
const InvoiceListPage = lazy(() => import("@/pages/Invoices/invoice-list-page"));
const CreateInvoicePage = lazy(() => import("@/pages/Invoices/create-invoice-page"));
const GSTInvoicePage = lazy(() => import("@/pages/Invoices/GSTInvoicePage"));
const ClientLedgerPage = lazy(() => import("@/pages/Ledger/client-ledger-page"));
const AffiliateDashboard = lazy(() => import("@/pages/Affiliate/AffiliateDashboard"));
const AffiliateAnalytics = lazy(() => import("@/pages/affiliate/affiliate-analytics"));
const NotFoundPage = lazy(() => import("@/pages/not-found/not-found"));

const Loader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading...</p>
    </div>
);

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    ROLES.ADMIN,
                                    ROLES.ADVOCATE,
                                    ROLES.JUNIOR_ADVOCATE,
                                    ROLES.STAFF,
                                ]}
                            >
                                <LegalDashboard />
                            </RoleBasedRoute>
                        }
                    />

                    {/* Clients */}
                    <Route
                        path="/clients"
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    ROLES.ADMIN,
                                    ROLES.ADVOCATE,
                                    ROLES.JUNIOR_ADVOCATE,
                                    ROLES.STAFF,
                                ]}
                            >
                                <ClientsPage />
                            </RoleBasedRoute>
                        }
                    />

                    {/* Invoices */}
                    <Route
                        path="/invoices"
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    ROLES.ADMIN,
                                    ROLES.ADVOCATE,
                                    ROLES.STAFF,
                                ]}
                            >
                                <InvoiceListPage />
                            </RoleBasedRoute>
                        }
                    />
                    <Route
                        path="/invoices/create"
                        element={
                            <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.ADVOCATE]}>
                                <CreateInvoicePage />
                            </RoleBasedRoute>
                        }
                    />
                    <Route
                        path="/invoices/gst"
                        element={
                            <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.ADVOCATE]}>
                                <GSTInvoicePage />
                            </RoleBasedRoute>
                        }
                    />

                    {/* Ledger */}
                    <Route
                        path="/ledger"
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    ROLES.ADMIN,
                                    ROLES.ADVOCATE,
                                    ROLES.STAFF,
                                ]}
                            >
                                <ClientLedgerPage />
                            </RoleBasedRoute>
                        }
                    />

                    {/* Affiliate Routes */}
                    <Route
                        path="/affiliate"
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    ROLES.ADMIN,
                                    ROLES.ADVOCATE,
                                    ROLES.JUNIOR_ADVOCATE,
                                    ROLES.STAFF,
                                    ROLES.CLIENT,
                                    ROLES.LITIGANT,
                                    ROLES.PUBLIC,
                                ]}
                            >
                                <AffiliateDashboard />
                            </RoleBasedRoute>
                        }
                    />

                    <Route
                        path="/affiliate/analytics"
                        element={
                            <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.ADVOCATE]}>
                                <AffiliateAnalytics />
                            </RoleBasedRoute>
                        }
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;