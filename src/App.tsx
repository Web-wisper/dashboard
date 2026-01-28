import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import DashboardLayout from "./components/layout/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Projects from "./pages/dashboard/Projects";
import VoiceBuilder from "./pages/dashboard/VoiceBuilder";
import ContentAI from "./pages/dashboard/ContentAI";
import Analytics from "./pages/dashboard/Analytics";
import Integrations from "./pages/dashboard/Integrations";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Get Clerk publishable key from environment
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Auth routes - redirect authenticated users to dashboard */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route path="/verify-email" element={<VerifyEmail />} />

              {/* Dashboard routes - require authentication */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Overview />} />
                <Route path="projects" element={<Projects />} />
                <Route path="voice-builder" element={<VoiceBuilder />} />
                <Route path="content-ai" element={<ContentAI />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
