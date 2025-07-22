// File path__
import "./index.css";
import router from "./Routes/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";

// Package(REACT-ROUTER-DOM, STRIPE)__
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// From react__
import { StrictMode } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Elements>
  </StrictMode>
);
