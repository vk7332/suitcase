import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Layouts
import MainLayout from "@/components/layout/MainLayout";

// Lazy-loaded Pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Clients = lazy(() => import("@/pages/Clients"));
const Invoices = lazy(() => import("@/pages/Invoices"));
const Ledger = lazy(() => import("@/pages/Ledger"));
const Reports = lazy(() => import("@/modules/reports/pages/Reports"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<div className="p-6">Loading SUITCASE...</div>}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <Dashboard />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <Dashboard />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/clients"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <Clients />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/invoices"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <Invoices />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/ledger"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <Ledger />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/reports"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <Reports />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />

                    {/* Redirects */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
