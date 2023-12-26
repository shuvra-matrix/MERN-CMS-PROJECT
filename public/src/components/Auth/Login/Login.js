import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = (propes) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state?.message || "";
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const inputDataHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailError(false);
    }
    if (name === "password") {
      setPassError(false);
    }

    setInputData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!inputData.email.includes("@") && inputData.email.length < 8) {
      setEmailError(true);
      return;
    }
    if (inputData.password.length < 6) {
      setPassError(true);
      return;
    }

    const url = "http://localhost:3030/auth/login";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: inputData.email,
        password: inputData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message === "login done") {
          const now = new Date();
          const expirationTime = now.getTime() + 60 * 60 * 1000;
          localStorage.setItem("token", data.token);
          localStorage.setItem("expirationTime", expirationTime);
          localStorage.setItem("isLogin", "yes");
          localStorage.setItem("userId", data.userId);
          propes.isLogin(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            <span>Sing Up</span>
          </Link>
        </p>
        <form method="post" onSubmit={onSubmitHandler}>
          <div className={styles["input-section"]}>
            <div
              className={`${styles["email"]} ${
                emailError ? styles["invalid"] : ""
              }`}
            >
              <label htmlFor="">Email Address</label>
              <input
                onChange={inputDataHandler}
                type="email"
                name="email"
                value={inputData.email}
                placeholder="your@example.com"
              ></input>
            </div>
            <div
              className={`${styles["password"]} ${
                passError ? styles["invalid"] : ""
              }`}
            >
              <label htmlFor="">Password</label>
              <input
                onChange={inputDataHandler}
                type="password"
                name="password"
                value={inputData.password}
                placeholder="Enter 6 character or more "
              ></input>
              <Link to="/forgotpassword">
                <p className={styles["forgot"]}>Forgot Password</p>
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
