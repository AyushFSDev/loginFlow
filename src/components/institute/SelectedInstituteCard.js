import styles from "./SelectedInstituteCard.module.css";

const SelectedInstituteCard = ({ institute }) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <img src={institute.logo} alt="logo" className={styles.logo} />

        <div>
          <div className={styles.name}>{institute.name}</div>
          <div className={styles.location}>
            <span className="material-symbols-rounded">location_on</span>
            {institute.location}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.badge}>
          <span className="material-symbols-rounded">verified</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedInstituteCard;