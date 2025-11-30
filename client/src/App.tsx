
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

// Layouts
import AuthLayout from "@/components/layout/auth-layout";
import DashboardLayout from "@/components/layout/dashboard-layout";

// Pages
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import VerifyEmail from "@/pages/auth/verify";
import ForgotPassword from "@/pages/auth/forgot-password";
import Home from "@/pages/dashboard/home";
import Banking from "@/pages/dashboard/banking";
import Cards from "@/pages/dashboard/cards";
import Investments from "@/pages/dashboard/investments";
import Insurance from "@/pages/dashboard/insurance";
import Profile from "@/pages/profile";
import Settings from "@/pages/settings";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setLocation("/dashboard");
      } else {
        setLocation("/login");
      }
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null;
}

function Router() {
  return (
    <Switch>
      {/* Public Auth Routes */}
      <Route path="/login">
        <AuthLayout>
          <Login />
        </AuthLayout>
      </Route>
      <Route path="/register">
        <AuthLayout>
          <Register />
        </AuthLayout>
      </Route>
      <Route path="/forgot-password">
        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      </Route>
      <Route path="/verify">
        <AuthLayout>
          <VerifyEmail />
        </AuthLayout>
      </Route>

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard">
        <ProtectedRoute component={Home} />
      </Route>
      <Route path="/dashboard/banking">
        <ProtectedRoute component={Banking} />
      </Route>
      <Route path="/dashboard/cards">
        <ProtectedRoute component={Cards} />
      </Route>
      <Route path="/dashboard/investments">
        <ProtectedRoute component={Investments} />
      </Route>
      <Route path="/dashboard/insurance">
        <ProtectedRoute component={Insurance} />
      </Route>
      <Route path="/profile">
        <ProtectedRoute component={Profile} />
      </Route>
      <Route path="/settings">
        <ProtectedRoute component={Settings} />
      </Route>

      {/* Redirect root to appropriate page */}
      <Route path="/" component={RootRedirect} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
