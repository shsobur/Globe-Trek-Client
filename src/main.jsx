// File path__
import "./index.css";
import router from "./Routes/Routes.jsx";

// Package(REACT-ROUTER-DOM)__
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

// From react__
import { StrictMode } from "react";
import AuthProvider from "./Provider/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);