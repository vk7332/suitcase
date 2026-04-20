import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "@/routes";
import { RoleProvider } from "@/context/rolecontext";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RoleProvider>
      <AppRoutes />
    </RoleProvider>
  </React.StrictMode>
);


