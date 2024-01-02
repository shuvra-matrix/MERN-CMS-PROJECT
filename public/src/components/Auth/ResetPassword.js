import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import LoaderForAuth from "../Loader/LoaderForAuth";
import LoaderSmall from "../Loader/LoaderSmall";
import blogLogo from "../../media/bloglogo.png";

const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const ResetPass = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [inputData, setInputData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passError, setPassError] = useState(false);
  const [conPassError, setConPassError] = useState(false);
  const [isCurrentState, setIsCurrentState] = useState("validate-message");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const inputDataHandler = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassError(false);
    }
    if (name === "confirmPassword") {
      setConPassError(false);
    }
    setInputData((pre) => {
      return { ...pre, [name]: value };
    });
    setIsError(false);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    let token = params.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const url = apiUrl + "/auth/verifyResetToken?token=" + token;

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("validation failed");
        }
        return response.json();
      })
      .then((data) => {
        setToken(data.token);
        setUserId(data.userId);

        setIsCurrentState("userinput");
      })
      .catch((err) => {
        console.log(err);
        setIsCurrentState("error");
      });
  }, [navigate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputData.password.length < 6) {
      setPassError(true);
      return;
    }
    if (inputData.confirmPassword.length < 6) {
      setConPassError(true);
      return;
    }
    if (inputData.password.trim() !== inputData.confirmPassword.trim()) {
      setIsError(true);
      setMessage("Passwords do not match");
      setConPassError(true);
      return;
    }

    const url = apiUrl + "/auth/restpassword";
    setIsLoader(true);
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        password: inputData.password,
        confirmPass: inputData.confirmPassword,
        token: token,
      }),
    })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("auth error");
        }
        if (response.status === 403) {
          setIsError(true);
          message("Check Your Password");
          return;
        }
        if (response.status === 404) {
          throw new Error("Token validation error");
        }

        return response.json();
      })
      .then((data) => {
        setIsLoader(false);
        navigate("/login", {
          state: {
            message: "Your password has been successfully reset",
          },
        });
      })
      .catch((err) => {
        setIsLoader(false);
        setIsCurrentState("error");
      });
  };

  return (
    <div className={styles["login-main"]}>
      <div className={styles["login-sub"]}>
        <div className={styles["title"]}>
          <Link to="/">
            <img src={blogLogo} alt="logo"></img>
          </Link>
          <Link to="/">
            <h3>
              Blog<span>Sp</span>ot
            </h3>
          </Link>
        </div>
        {isCurrentState === "validate-message" && (
          <div className={styles["validate-message-main"]}>
            <p className={styles["validate-message"]}>
              Kindly wait as we validate your request
            </p>
            <LoaderSmall />
          </div>
        )}

        {isCurrentState === "error" && (
          <Fragment>
            <p className={styles["error-message"]}>
              Regrettably, the password reset token has expired, or an
              unforeseen issue has arisen. Kindly make another attempt to reset
              your password
            </p>
            <div className={styles["options"]}>
              <Link to="/login">
                <p className={styles["login-p"]}>Login</p>
              </Link>
              <Link to="/forgotpassword">
                <p className={styles["forgot-p"]}>Forgot Passwords</p>
              </Link>
            </div>
          </Fragment>
        )}

        {isCurrentState === "userinput" && (
          <Fragment>
            <h3 className={styles["login"]}>Reset Password</h3>
            <form method="post" onSubmit={onSubmitHandler}>
              <div className={styles["input-section"]}>
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
                    placeholder="Enter 6 character or more "
                  ></input>
                </div>
                <div
                  className={`${styles["password"]} ${
                    conPassError ? styles["invalid"] : ""
                  }`}
                >
                  <label htmlFor="">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    onChange={inputDataHandler}
                    type="text"
                    placeholder="Enter 6 character or more "
                  ></input>
                </div>
              </div>
              {isLoader ? (
                <button className={styles["btn"]} type="button" disabled>
                  <LoaderForAuth />
                </button>
              ) : (
                <button className={styles["btn"]} type="submit">
                  Reset Password
                </button>
              )}
            </form>
            {isError && <p className={styles["message"]}>{message}</p>}{" "}
          </Fragment>
        )}
      </div>
      <div className={styles["design"]}></div>
    </div>
  );
};

export default ResetPass;
