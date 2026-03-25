// src/routes/AppRoutes.js

// Router imports
import { Routes, Route, Navigate } from "react-router-dom";

// Page imports
import Login from "../pages/Login";
import InstituteSelect from "../pages/InstituteSelect";
import RoleSelect from "../pages/RoleSelect";
import Dashboard from "../pages/Dashboard";

/**
 * AppRoutes Component
 *
 * Defines all application routes.
 * Handles navigation between authentication flow and main dashboard.
 */
const AppRoutes = () => {
  return (
    <Routes>
      
      {/* Public Route - Login */}
      <Route path="/" element={<Login />} />

      {/* Institute Selection */}
      <Route path="/institute" element={<InstituteSelect />} />

      {/* Role Selection */}
      <Route path="/role" element={<RoleSelect />} />

      {/* Main Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Fallback Route - Redirect unknown paths to Login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;