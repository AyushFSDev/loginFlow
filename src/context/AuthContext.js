// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // Global dark mode state
  const [isDark, setIsDark] = useState(false);

  /**
   * toggleTheme:
   * - Flips isDark state globally
   * - Applies data-theme attribute on <html> for CSS variables
   */
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute(
      "data-theme",
      next ? "dark" : "light",
    );
  };

  const logout = () => {
    setUser(null);
    setSelectedInstitute(null);
    setSelectedRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        selectedInstitute,
        setSelectedInstitute,
        selectedRole,
        setSelectedRole,
        logout,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
