import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import AuthProvider from "../provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      richColors
      position="top-center"
      toastOptions={{ classNames: { toast: "bg-purple-300" } }}
    />
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>
);
