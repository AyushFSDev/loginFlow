// src/components/role/RoleCard.js
import styles from "./RoleCard.module.css";

const ROLE_ICONS = {
  admin: "shield_person",
  principal: "workspace_premium",
  teacher: "school",
  parent: "groups",
};

const RoleCard = ({ role, onClick, isSelected }) => {
  const iconName = ROLE_ICONS[role.id] || "person";

  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ""}`} 
      onClick={() => onClick(role)}
    >
      <div className={styles.left}>
        <div className={`${styles.iconBox} ${styles[role.id]}`}>
          <span className="material-symbols-rounded">{iconName}</span>
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{role.name}</h3>
          <p className={styles.desc}>{role.desc}</p>
        </div>
      </div>
      
      <div className={styles.right}>
        <div className={styles.arrowBox}>
          <span className="material-symbols-rounded">chevron_right</span>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;