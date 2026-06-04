import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import { AuthProvider as TokenProvider } from "./providers/AuthProvider";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <AuthProvider>
                <TokenProvider>
                    <RoleProvider>
                        <App />
                    </RoleProvider>
                </TokenProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
