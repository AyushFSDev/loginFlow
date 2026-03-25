import styles from "./InstituteCard.module.css";

const InstituteCard = ({ institute, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(institute)}>
      <div className={styles.left}>
        <div className={styles.iconBox}>
          <img src={institute.logo } alt="inst" />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{institute.name}</h3>
          <p className={styles.location}>
            <span className={`material-symbols-rounded ${styles.locationIcon}`}>
  location_on
</span>
            {institute.location}
          </p>
        </div>
      </div>
      
      <div className={styles.right}>
        <span className={styles.type}>{institute.type || "School"}</span>
        <div className={styles.arrowBox}>
          <span className="material-symbols-rounded">chevron_right</span>
        </div>
      </div>
    </div>
  );
};

export default InstituteCard;