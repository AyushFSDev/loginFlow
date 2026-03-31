// src/constants/strings.js
// ─────────────────────────────────────────────────────────────
// ALL FRONTEND TEXT IS STORED HERE
// To change language, update the values in this file only.
// Usage: import STRINGS from "../constants/strings";
// ─────────────────────────────────────────────────────────────

const STRINGS = {

  // ── App ──────────────────────────────────────────────────
  app: {
    name: "SchoolCoreOS",
    logoAlt: "SchoolCoreOS Logo",
  },

  // ── Login Page ───────────────────────────────────────────
  login: {
    emailPlaceholder:    "Email",
    passwordPlaceholder: "Password",
    submitBtn:           "Continue",
    submittingBtn:       "Logging in...",
    footerText:          "By continuing, you agree to our",
    footerLink:          "Terms & Privacy Policy",
    reportTitle:         "Report a problem",
    toggleThemeTitle:    "Toggle theme",
    errorFallback:       "Login failed. Please try again.",
  },

  // ── Institute Select Page ────────────────────────────────
  instituteSelect: {
    greeting:       (name) => `Hi, ${name}!`,
    subTitle:       "Select your institute to access your personalized dashboard",
    searchPlaceholder: "Search by name, city or state...",
    notFound:       "No institute found",
    footerText:     "Can't find your institute? Contact your administrator or email",
    footerEmail:    "support@schoolcoreos.com",
    defaultType:    "School",
  },

  // ── Role Select Page ─────────────────────────────────────
  roleSelect: {
    title:          "Choose Your Role",
    subTitle:       "Select your role for this institute to continue",
    changeInstitute:"Change Institute",
    footerText:     "Can't find your role? Email",
    footerEmail:    "support@schoolcoreos.com",
  },

  // ── Dashboard Page ───────────────────────────────────────
  dashboard: {
    navTitle:       "SchoolCoreOS",
    heroTitle:      "Welcome to SchoolCoreOS",
    heroSub:        "Admin Panel!",
    logoAlt:        "logo",
    userAvatarAlt:  "user",
  },

  // ── Dashboard Stat Cards ─────────────────────────────────
  dashboardStats: [
    {
      id:    "active",
      label: "Active Institutes",
      value: "08",
      desc:  "Institutes actively operating and using the platform for daily management",
    },
    {
      id:    "inactive",
      label: "Inactive Institutes",
      value: "05",
      desc:  "Institutes currently inactive and not participating in system operations",
    },
    {
      id:    "modules",
      label: "Total Modules",
      value: "15+",
      desc:  "Complete set of features enabling academic and administrative workflows",
    },
    {
      id:    "users",
      label: "Total Users",
      value: "1.2k",
      desc:  "Total number of users registered across all managed institutes",
    },
  ],

  // ── Common / Shared ──────────────────────────────────────
  common: {
    errorFallback: "Something went wrong",
  },

};

export default STRINGS;
