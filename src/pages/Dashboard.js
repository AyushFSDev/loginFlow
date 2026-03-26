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
    id: "active",
    label: "Active Institutes",
    value: "08",
    desc: "Institutes actively operating and using the platform for daily management",
  },
  {
    id: "inactive",
    label: "Inactive Institutes",
    value: "05",
    desc: "Institutes currently inactive and not participating in system operations",
  },
  {
    id: "modules",
    label: "Total Modules",
    value: "15+",
    desc: "Complete set of features enabling academic and administrative workflows",
  },
  {
    id: "users",
    label: "Total Users",
    value: "1.2k",
    desc: "Total number of users registered across all managed institutes",
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
            // Each stat card
            <div
              key={stat.id}
              className={`${styles.statCard} ${styles[stat.id]}`}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <p className={styles.statDesc}>{stat.desc}</p>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
