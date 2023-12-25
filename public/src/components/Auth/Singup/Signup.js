import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={styles["login-main"]}>
      <div className={styles["login-sub"]}>
        <div className={styles["title"]}>
          <h3>
            Blog<span>Sp</span>ot
          </h3>
        </div>

        <h3 className={styles["login"]}>Sign Up</h3>

        <form method="post">
          <div className={styles["input-section"]}>
            <div className={styles["email"]}>
              <label htmlFor="">Name</label>
              <input type="text" placeholder="Your name"></input>
            </div>
            <div className={styles["email"]}>
              <label htmlFor="">Email Address</label>
              <input type="email" placeholder="your@example.com"></input>
            </div>
            <div className={styles["password"]}>
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Enter 6 character or more "
              ></input>
            </div>
            <div className={styles["password"]}>
              <label htmlFor="">Confirm Password</label>
              <input
                type="text"
                placeholder="Enter 6 character or more "
              ></input>
            </div>
          </div>
          <button className={styles["btn"]} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className={styles["design"]}></div>
    </div>
  );
};

export default Signup;
