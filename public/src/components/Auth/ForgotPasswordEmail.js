import styles from "./Auth.module.css";
const ForgotPassEmail = () => {
  return (
    <div className={styles["login-main"]}>
      <div className={styles["login-sub"]}>
        <div className={styles["title"]}>
          <h3>
            Blog<span>Sp</span>ot
          </h3>
        </div>

        <h3 className={styles["login"]}>Forgot Password</h3>

        <form method="post">
          <div className={styles["input-section"]}>
            <div className={styles["email"]}>
              <label htmlFor="">Email</label>
              <input type="email" placeholder="your@example.com"></input>
            </div>
          </div>
          <button className={styles["btn"]} type="submit">
            Send Otp
          </button>
        </form>
      </div>
      <div className={styles["design"]}></div>
    </div>
  );
};

export default ForgotPassEmail;
