// External imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal imports
import { useAuth } from "../context/AuthContext";
import { handleInstituteSelect } from "../utils/flowHandler";
import InstituteCard from "../components/institute/InstituteCard";
import styles from "./InstituteSelect.module.css";

// Assets
import whiteLogo from "../assets/image/white-logo.png";
import blackLogo from "../assets/image/black-logo.png";

/**
 * InstituteSelect Component
 * 
 * Responsible for:
 * - Displaying list of user institutes
 * - Searching/filtering institutes
 * - Handling institute selection flow
 */
const InstituteSelect = () => {
  const navigate = useNavigate();

  /**
   * Auth context values
   * - user: logged-in user details
   * - setSelectedInstitute: stores selected institute
   * - setSelectedRole: stores role if auto-selected
   * - isDark: theme state
   */
  const { user, setSelectedInstitute, setSelectedRole, isDark } = useAuth();

  // Search input state
  const [search, setSearch] = useState("");

  /**
   * Filter institutes based on search input
   * Case-insensitive matching
   */
  const filtered = (user?.institutes || []).filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  /**
   * Handle institute selection
   * - Saves selected institute
   * - Determines next screen using flow handler
   * - Navigates accordingly
   * - Sets role if auto-selected
   */
  const handleClick = (institute) => {
    setSelectedInstitute(institute);

    const { nextScreen, role } = handleInstituteSelect(institute);

    if (nextScreen === "SELECT_ROLE") {
      navigate("/role");
    } else {
      setSelectedRole(role);
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.page}>
      
      {/* Header section with logo and user avatar */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <img
            src={isDark ? whiteLogo : blackLogo}
            alt="logo"
            className={styles.logo}
          />
          <span className={styles.brandName}>SchoolCoreOS</span>
        </div>
        <div className={styles.avatar}>
          {user?.initials || "A"}
        </div>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        
        {/* Greeting section */}
        <div className={styles.greeting}>
          <h1 className={styles.greetTitle}>
            Hi, {user?.name?.split(" ")[0]}!
          </h1>
          <p className={styles.greetSub}>
            Select your institute to access your personalized dashboard
          </p>
        </div>

        {/* Search input */}
        <div className={styles.searchWrap}>
          <div className={styles.searchInner}>
            <span className="material-symbols-rounded">search</span>
            <input
              placeholder="Search your institute..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Institute list */}
        <div className={styles.list}>
          {filtered.map((inst) => (
            <InstituteCard
              key={inst.id}
              institute={inst}
              onClick={handleClick}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        Can't find your institute? Contact your administrator or email{" "}
        <span className={styles.link}>
          support@schoolcoreos.com
        </span>
      </footer>
    </div>
  );
};

export default InstituteSelect;