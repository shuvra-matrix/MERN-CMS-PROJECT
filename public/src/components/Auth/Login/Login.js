import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useLocation } from "react-router-dom";

const Login = (propes) => {
  const { state } = useLocation();
  const data = state?.message || "";

  const signupRoutesHandler = () => {
    propes.authRoutes("signup");
  };

  const forgotPassRoutesHandler = () => {
    propes.authRoutes("forgotpass");
  };

  return (
    <div className={styles["login-main"]}>
      <div className={styles["login-sub"]}>
        <div className={styles["title"]}>
          <h3>
            Blog<span>Sp</span>ot
          </h3>
        </div>
        {data.length > 4 ? <p>{data}</p> : ""}

        <h3 className={styles["login"]}>Login</h3>
        <p className={styles["signup"]}>
          Doesn't have account yet?{" "}
          <Link to="/signup">
            <span onClick={signupRoutesHandler}>Sing Up</span>
          </Link>
        </p>
        <form method="post">
          <div className={styles["input-section"]}>
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
              <Link to="/forgotpassword">
                <p
                  onClick={forgotPassRoutesHandler}
                  className={styles["forgot"]}
                >
                  Forgot Password
                </p>
              </Link>
            </div>
          </div>
          <button className={styles["btn"]} type="submit">
            Login
          </button>
        </form>
      </div>
      <div className={styles["design"]}></div>
    </div>
  );
};

export default Login;
