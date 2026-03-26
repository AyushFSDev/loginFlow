// External Imports
import { useNavigate } from "react-router-dom";

// Internal Imports
import { useAuth } from "../context/AuthContext";
import styles from "./Dashboard.module.css";

// Assets
import whiteLogo from "../assets/image/white-logo.png";
import blackLogo from "../assets/image/black-logo.png";

/**
 * Dashboard Statistics Data
 * - Contains all card-related UI data
 * - Includes light & dark mode background colors
 */
const STATS = [
  {
    label: "Active Institutes",
    value: "08",
    desc: "Institutes actively operating and using the platform for daily management",
    lightBg: "#e0e7ff",
    darkBg: "rgba(99, 102, 241, 0.15)",
    color: "#6366f1",
  },
  {
    label: "Inactive Institutes",
    value: "05",
    desc: "Institutes currently inactive and not participating in system operations",
    lightBg: "#f0fdf4",
    darkBg: "rgba(34, 197, 94, 0.15)",
    color: "#22c55e",
  },
  {
    label: "Total Modules",
    value: "15+",
    desc: "Complete set of features enabling academic and administrative workflows",
    lightBg: "#fff7ed",
    darkBg: "rgba(249, 115, 22, 0.15)",
    color: "#f97316",
  },
  {
    label: "Total Users",
    value: "50+",
    desc: "All registered users across institutes using the platform services",
    lightBg: "#eef2ff",
    darkBg: "rgba(129, 140, 248, 0.15)",
    color: "#818cf8",
  },
];

/**
 * Dashboard Component
 * - Main landing page after login
 * - Displays navigation, user info & statistics
 */
const Dashboard = () => {
  const navigate = useNavigate();

  /**
   * Auth Context
   * - user → logged-in user details
   * - selectedInstitute → currently selected institute
   * - selectedRole → selected role
   * - logout → logout function
   * - isDark → theme state
   */
  const { user, selectedInstitute, selectedRole, logout, isDark } = useAuth();

  /**
   * Handle Logout
   * - Clears auth state
   * - Redirects to login page
   */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.page}>
      
      {/* Top Navigation Bar */}
      <nav className={styles.nav}>
        
        {/* Left Section (Menu + Logo + Title) */}
        <div className={styles.navLeft}>
          <button className={styles.menuBtn}>
            <span className="material-symbols-rounded">menu</span>
          </button>

          {/* Logo changes based on theme */}
          <div className={styles.logoWrap}>
            <img
              src={isDark ? whiteLogo : blackLogo}
              alt="logo"
              className={styles.dashboardLogo}
            />
          </div>

          <span className={styles.navTitle}>SchoolCoreOS</span>
        </div>

        {/* Right Section (User Avatar) */}
        <div className={styles.navRight}>
          <div className={styles.avatarWrap} onClick={handleLogout}>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                user?.name || "Felix"
              }`}
              alt="user"
              className={styles.avatarImg}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.content}>
        
        {/* Welcome Section */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome to SchoolCoreOS</h1>
          <h2 className={styles.heroSub}>Admin Panel!</h2>
        </div>

        {/* Stats Cards Grid */}
        <div className={styles.statsGrid}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={styles.statCard}
              style={{
                backgroundColor: isDark ? stat.darkBg : stat.lightBg,
              }}
            >
              {/* Value */}
              <div
                className={styles.statValue}
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                className={styles.statLabel}
                style={{ color: isDark ? "#fff" : stat.color }}
              >
                {stat.label}
              </div>

              {/* Description */}
              <p className={styles.statDesc}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;