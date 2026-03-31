// src/routes/AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import InstituteSelect from "../pages/InstituteSelect";
import RoleSelect from "../pages/RoleSelect";
import Dashboard from "../pages/Dashboard";

// ─── Protected Route Guard ────────────────────────────────────────────────────
// If user is not logged in, redirect to login page
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

// ─── Auth Route Guard ─────────────────────────────────────────────────────────
// If already logged in, do not show the login page
const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  const hasAccessToken = !!localStorage.getItem("access_token");

  if (user && hasAccessToken) return <Navigate to="/dashboard" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />

      {/* Semi-protected (user must be logged in) */}
      <Route
        path="/institute"
        element={
          <ProtectedRoute>
            <InstituteSelect />
          </ProtectedRoute>
        }
      />

      <Route
        path="/role"
        element={
          <ProtectedRoute>
            <RoleSelect />
          </ProtectedRoute>
        }
      />

      {/* Fully Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
