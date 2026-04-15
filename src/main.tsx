import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "@/routes";
import { RoleProvider } from "@/context/RoleContext";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RoleProvider>
      <AppRoutes />
    </RoleProvider>
  </React.StrictMode>
);