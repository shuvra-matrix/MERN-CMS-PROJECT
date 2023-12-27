import styles from "./LoaderSmall.module.css";

const LoaderSmall = () => {
  return (
    <div className={styles["pl1"]}>
      <div className={styles["pl1__a"]}></div>
      <div className={styles["pl1__b"]}></div>
      <div className={styles["pl1__c"]}></div>
    </div>
  );
};

export default LoaderSmall;
