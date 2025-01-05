import CookieConsent from "react-cookie-consent";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import ProfilPage from "./pages/ProfilPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/auth.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/p/:post_id",
    element: (
      <ProtectedRoute>
        <PostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/u/:user_id",
    element: (
      <ProtectedRoute>
        <ProfilPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AuthProvider>
      <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="cookie_consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </ThemeProvider>,
);
