import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import { RoleProvider } from "./context/role-context";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <RoleProvider>
                    <App />
                </RoleProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
