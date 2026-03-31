// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import STRINGS from "../constants/strings";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import styles from "../style/Login.module.css";
import whiteLogo from "../assets/image/white-logo.png";
import blackLogo from "../assets/image/black-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setInstitutes, setSelectedInstitute, isDark, toggleTheme } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // ─── Step 1: Login API call ───────────────────────────────────────────
      const res = await api.post("/auth/login", { email, password });

      // Fix 1: Check for pre_context_token directly — backend may not send "success" field
      // If token is missing, login failed regardless of status code
      console.log("LOGIN RESPONSE:", res.data);
      if (!res.data || !res.data.pre_context_token) {
        throw new Error(res.data?.message || STRINGS.login.errorFallback);
      }

      const { pre_context_token, user } = res.data;

      // ─── Step 2: Store pre_context_token ─────────────────────────────────
      localStorage.setItem("pre_context_token", pre_context_token);

      // ─── Step 3: Set user in context ─────────────────────────────────────
      setUser(user);

      // ─── Step 4: Fetch institutes + roles with explicit Authorization header
      // Fix 2: Pass pre_context_token explicitly — interceptor may not have it yet
      const instRes = await api.get("/auth/my-institutes-roles", {
        headers: {
          Authorization: `Bearer ${pre_context_token}`,
        },
      });

      const institutesData = instRes.data.data; // array of { tenant_id, institute_id, institute_name, roles[] }
      setInstitutes(institutesData);

      // ─── Step 5: Decide navigation flow ───────────────────────────────────
      if (institutesData.length === 1 && institutesData[0].roles.length === 1) {
        // Only 1 institute + 1 role → directly select context → dashboard
        const only = institutesData[0];
        await selectContextAndGo(only.tenant_id, only.institute_id, only.roles[0].role_id, pre_context_token);
      } else if (institutesData.length === 1) {
        // 1 institute, multiple roles → go to role select page
        setSelectedInstitute(institutesData[0]);
        navigate("/role");
      } else {
        // Multiple institutes → go to institute select page
        navigate("/institute");
      }

    } catch (err) {
      // Fix 3: Proper error extraction — login error and next API error no longer mix
      console.log("LOGIN ERROR:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        STRINGS.login.errorFallback;

      setError(message);
      // ─── Fields Clear Karne Ka Logic ───────────────────────
      setEmail("");    // Email field reset
      setPassword(""); // Password field reset
      // ───────────────────────────────────────────────────────
    } finally {
      setLoading(false);
    }
  };

  // ─── Select context and navigate to dashboard ─────────────────────────────
  // Pass pre_context_token explicitly for the same reason as above
  const selectContextAndGo = async (tenant_id, institute_id, role_id, pre_context_token) => {
    const res = await api.post(
      "/auth/select-context",
      { tenant_id, institute_id, role_id },
      { headers: { Authorization: `Bearer ${pre_context_token}` } }
    );
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.removeItem("pre_context_token");
    navigate("/dashboard");
  };

  return (
    <div className={styles.page}>

      {/* Top action buttons — type="button" prevents any accidental form submit */}
      <div className={styles.topActions}>
        <button type="button" className={styles.iconBtn} title={STRINGS.login.reportTitle}>
          <span className="material-symbols-rounded">warning</span>
        </button>
        <button type="button" className={styles.iconBtn} onClick={toggleTheme} title={STRINGS.login.toggleThemeTitle}>
          <span className="material-symbols-rounded">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </div>

      <div className={styles.card}>

        {/* Logo + app name */}
        <div className={styles.logoArea}>
          <div className={styles.logoWrap}>
            <img
              src={isDark ? whiteLogo : blackLogo}
              width="64"
              height="64"
              alt={STRINGS.app.logoAlt}
              className={styles.logoImg}
            />
          </div>
          <h1 className={styles.appName}>{STRINGS.app.name}</h1>
        </div>

        {/* Input fields */}
        <div className={styles.fields}>
          <Input
            placeholder={STRINGS.login.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder={STRINGS.login.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error banner — shown inline, no page reload */}
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
          {loading ? STRINGS.login.submittingBtn : STRINGS.login.submitBtn}
        </Button>

      </div>

      {/* Footer */}
      <p className={styles.footer}>
        {STRINGS.login.footerText}{" "}
        <span className={styles.link}>{STRINGS.login.footerLink}</span>
      </p>

    </div>
  );
};

export default Login;
