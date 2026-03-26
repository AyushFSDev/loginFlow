// src/components/role/RoleCard.js
import Card from "../common/Card";
import styles from "./RoleCard.module.css";

// Material Symbol names for different roles
const ROLE_ICONS = {
  admin: "shield_person",
  principal: "workspace_premium",
  teacher: "school",
  parent: "groups",
};

/**
 * RoleCard Component
 * Displays a role with its icon, name, and description.
 * Targeting colors through CSS classes instead of inline styles.
 */
const RoleCard = ({ role, onClick, isSelected }) => {
  // Get icon name from mapping or fallback to 'person'
  const iconName = ROLE_ICONS[role.id] || "person";
  
  // Construct icon container class based on role id
  const iconCls = `${styles.iconBox}`;

  // Target specific role colors in CSS using the role.id as a class name
  const cardRowCls = `${styles.row} ${styles[role.id] || styles.default}`;

  return (
    <Card selected={isSelected} onClick={() => onClick(role)}>
      <div className={cardRowCls}>
        {/* The wrapper div handles structure, the span handles icon color */}
        <div className={iconCls}>
          <span className="material-symbols-rounded">{iconName}</span>
        </div>
        
        <div className={styles.info}>
          <div className={styles.name}>{role.name}</div>
          {role.desc && <div className={styles.desc}>{role.desc}</div>}
        </div>
        
        {/* Standard navigation arrow */}
        <div
          className={`${styles.arrow} ${isSelected ? styles.arrowActive : ""}`}
        >
          <span className="material-symbols-rounded">chevron_right</span>
        </div>
      </div>
    </Card>
  );
};

export default RoleCard;