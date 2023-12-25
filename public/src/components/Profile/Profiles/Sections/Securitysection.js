import styles from "./Profilesection.module.css";

const SecuritySection = () => {
  return (
    <div className={styles["profile-main"]}>
      <h3>Change Password</h3>
      <form action="" method="post">
        <div className={styles["profile-sub"]}>
          <div className={styles["section"]}>
            <label htmlFor="">Previous Password</label>
            <input type="password"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">New Password</label>
            <input type="password"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Confirm Password</label>
            <input type="text"></input>
          </div>
        </div>
        <div className={styles["button"]}>
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySection;
