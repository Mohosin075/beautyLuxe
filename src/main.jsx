import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import AuthProvider from "../provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "../provider/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <Toaster
            richColors
            position="top-center"
            toastOptions={{ classNames: { toast: "bg-purple-300" } }}
          />
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
