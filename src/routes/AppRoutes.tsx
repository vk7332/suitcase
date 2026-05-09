import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ProtectedRoute from "./ProtectedRoute";
import UploadDocument from "../pages/upload-document";
import Documents from "../pages/documents";
import VerifyPage from "../pages/verify";

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