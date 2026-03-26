// src/pages/RoleSelect.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Components
import RoleCard from "../components/role/RoleCard";
import SelectedInstituteCard from "../components/institute/SelectedInstituteCard";

// Assets & Styles
import styles from "./RoleSelect.module.css";
import whiteLogo from "../assets/image/white-logo.png";
import blackLogo from "../assets/image/black-logo.png";

/**
 * RoleSelect Component:
 * Allows the user to select their specific role (Admin, Teacher, etc.)
 * for the previously selected institute.
 */
const RoleSelect = () => {
  const navigate = useNavigate();
  
  // Custom hook for authentication context
  const { user, selectedInstitute, setSelectedRole, isDark } = useAuth();
  
  // Local state to manage the currently highlighted/selected role
  const [selected, setSelected] = useState(null);

  /** 
   * Computed Properties:
   * 'roles' extracts roles from the selected institute.
   * 'hasMultiInstitute' determines if we should show the "Change Institute" option.
   */
  const roles = selectedInstitute?.roles || [];
  const hasMultiInstitute = (user?.institutes || []).length > 1;

  /**
   * handleSelect:
   * Sets the role in global state and routes the user to the dashboard.
   * @param {Object} role - The role object containing id and metadata.
   */
  const handleSelect = (role) => {
    setSelected(role.id);
    setSelectedRole(role);
    navigate("/dashboard");
  };

  return (
    <div className={styles.page}>
      
      {/* --- TOP NAVIGATION BAR --- */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <img 
            src={isDark ? whiteLogo : blackLogo} 
            alt="SchoolCoreOS Logo" 
            className={styles.logo} 
          />
          <span className={styles.brandName}>SchoolCoreOS</span>
        </div>
        <div className={styles.avatar}>
          {user?.initials || "A"}
        </div>
      </header>

      <main className={styles.main}>
        
        {/* --- BACK NAVIGATION --- 
            Visible only if the user belongs to multiple institutes */}
        {hasMultiInstitute && (
          <div className={styles.backRow}>
            <button
              className={styles.backBtn}
              onClick={() => navigate("/institute")}
              aria-label="Back to institute selection"
            >
              <span className="material-symbols-rounded">arrow_back</span>
              Change Institute
            </button>
          </div>
        )}

        {/* --- SELECTED INSTITUTE PREVIEW --- 
            Shows the context of the current selection with a verified badge */}
        {selectedInstitute && (
          <div className={styles.activeSection}>
            <div className={styles.activeCardWrapper}>
              <SelectedInstituteCard institute={selectedInstitute} />
            </div>
          </div>
        )}

        {/* --- INSTRUCTIONAL TEXT --- */}
        <div className={styles.greeting}>
          <h1 className={styles.greetTitle}>Choose Your Role</h1>
          <p className={styles.greetSub}>
            Select your role for this institute to continue
          </p>
        </div>

        {/* --- ROLE LIST AREA --- 
            Dynamically renders all available roles for the institute */}
        <div className={styles.list}>
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              isSelected={selected === role.id}
              onClick={handleSelect}
            />
          ))}
        </div>
      </main>

      {/* --- PAGE FOOTER --- */}
      <footer className={styles.footer}>
        Can't find your role? Contact your administrator or email{" "}
        <span className={styles.link} onClick={() => window.open("mailto:support@schoolcoreos.com")}>support@schoolcoreos.com</span>
      </footer>
    </div>
  );
};

export default RoleSelect;