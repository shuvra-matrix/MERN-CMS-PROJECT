import styles from "./Forgotpassword.module.css";

const Otpverify = () => {
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
              <label htmlFor="">OTP</label>
              <input type="email" placeholder="Enter your 6 digit otp "></input>
            </div>
          </div>
          <button className={styles["btn"]} type="submit">
            Verify
          </button>
        </form>
      </div>
      <div className={styles["design"]}></div>
    </div>
  );
};

export default Otpverify;
