// src/pages/Login.js

// External imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal imports
import { useAuth } from "../context/AuthContext";
import { USERS } from "../data/userData";
import { handleLoginFlow } from "../utils/flowHandler";

// UI Components
import Button from "../components/common/Button";
import Input from "../components/common/Input";

// Styles
import styles from "./Login.module.css";

// Assets
import whiteLogo from "../assets/image/white-logo.png";
import blackLogo from "../assets/image/black-logo.png";

/**
 * Login Component
 *
 * Responsibilities:
 * - Handle user authentication
 * - Manage login form state
 * - Control theme toggle (temporary/local)
 * - Redirect user based on login flow
 */
const Login = () => {
  const navigate = useNavigate();

  /**
   * Auth context setters
   * Used to store user session data globally
   */
  const { setUser, setSelectedInstitute, setSelectedRole } = useAuth();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Local theme state (only for login page)
  const [dark, setDark] = useState(false);

  /**
   * Toggle theme for login page
   * Applies data-theme attribute on root element
   */
  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute(
      "data-theme",
      next ? "dark" : "light"
    );
  };

  /**
   * Handle login action
   * - Validates credentials
   * - Updates global auth state
   * - Navigates user based on flow
   */
 const handleLogin = () => {
  setError("");
  setLoading(true);

  setTimeout(() => {
    const result = handleLoginFlow(email, password, USERS);

    // ❌ Error case
    if (result.type === "ERROR") {
      setError(result.message);
      setLoading(false);
      return;
    }

    // ✅ Success case
    setUser(result.user);

    if (result.institute) {
      setSelectedInstitute(result.institute);
    }

    if (result.role) {
      setSelectedRole(result.role);
    }

    const routes = {
      DASHBOARD: "/dashboard",
      SELECT_INSTITUTE: "/institute",
      SELECT_ROLE: "/role",
    };

    navigate(routes[result.nextScreen] || "/dashboard");

    setLoading(false);
  }, 400);
};

  return (
    <div className={styles.page}>
      
      {/* Top action buttons (theme toggle + report) */}
      <div className={styles.topActions}>
        <button className={styles.iconBtn} title="Report a problem">
          <span className="material-symbols-rounded">warning</span>
        </button>

        <button
          className={styles.iconBtn}
          onClick={toggleDark}
          title="Toggle theme"
        >
          <span className="material-symbols-rounded">
            {dark ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </div>

      {/* Login card */}
      <div className={styles.card}>
        
        {/* Logo and app name */}
        <div className={styles.logoArea}>
          <div className={styles.logoWrap}>
            <img
              src={dark ? whiteLogo : blackLogo}
              width="64"
              height="64"
              alt="SchoolCoreOS Logo"
              className={styles.logoImg}
            />
          </div>
          <h1 className={styles.appName}>SchoolCoreOS</h1>
        </div>

       
        {/* Input fields */}
        <div className={styles.fields}>
          <Input
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
         {/* Error message */}
        {error && (
          <div className={styles.errorBanner}>
            <div className={styles.errorIcon}>
              <span className="material-symbols-rounded">warning</span>
            </div>
            <div className={styles.errorContent}>
              <p className={styles.errorText}>{error}</p>
            </div>
          </div>
        )}  

        {/* Submit button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleLogin}
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? "Logging in..." : "Continue"}
        </Button>
        
      </div>

      {/* Footer */}
      <p className={styles.footer}>
        By continuing, you agree to our{" "}
        <span className={styles.link}>
          Terms & Privacy Policy
        </span>
      </p>
    </div>
  );
};

export default Login;