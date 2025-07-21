import styles from  "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.fullScreenLoader}>
      <span className={styles.gear}>⚙️</span>
      <p>Loading ...</p>
    </div>
  );
}

export default Loading;