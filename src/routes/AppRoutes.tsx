import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/index";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import UploadDocument from "../pages/UploadDocument";
import Documents from "../pages/Documents";
import VerifyPage from "../pages/Verify";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload" element={<UploadDocument />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/verify/:id" element={<VerifyPage />} />

            {/* Protected */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Default */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}
