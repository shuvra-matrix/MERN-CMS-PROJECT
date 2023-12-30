import styles from "./LoaderThree.module.css";

const LoaderThree = () => {
  return (
    <div className={styles["container"]}>
      <div className={`${styles["item"]} ${styles["item-1"]}`}></div>
      <div className={`${styles["item"]} ${styles["item-2"]}`}></div>
      <div className={`${styles["item"]} ${styles["item-3"]}`}></div>
      <div className={`${styles["item"]} ${styles["item-4"]}`}></div>
    </div>
  );
};

export default LoaderThree;
