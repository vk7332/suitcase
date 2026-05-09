import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import "./index.css";
import '@/styles/global.css';

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) =>
  React.createElement(React.Fragment, null, children);

ReactDOM.createRoot(document.getElementById("root")!).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      BrowserRouter,
      null,
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(AuthProvider, null, React.createElement(App, null))
      )
    )
  )
);