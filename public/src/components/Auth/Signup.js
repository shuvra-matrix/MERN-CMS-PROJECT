import styles from "./Auth.module.css";
import { Fragment, useState } from "react";
import Otpverify from "./Otpverify";
import LoaderForAuth from "../Loader/LoaderForAuth";
import { Link } from "react-router-dom";
import blogLogo from "../../media/bloglogo.png";

const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const Signup = (props) => {
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [userId, setUserId] = useState(null);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [conPassError, setConPassError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const otpSectionHandler = (value) => {
    setShowOtpSection(value);
  };

  const inputDataHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setNameError(false);
    }
    if (name === "email") {
      setEmailError(false);
    }
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

  const submitHandler = (e) => {
    e.preventDefault();
    setShowOtpSection(false);

    if (inputData.name.length < 6) {
      setNameError(true);
      return;
    }
    if (!inputData.email.includes("@") && inputData.email.length < 8) {
      setEmailError(true);
      return;
    }
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

    setIsLoader(true);

    const url = apiUrl + "/auth/signup/";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("server Error");
        }

        return response.json();
      })
      .then((data) => {
        setIsLoader(false);
        if (data.data === "Email present!") {
          setIsError(true);
          setMessage("Email already registered.");
          return;
        }

        const message = data.message;

        if (message === "otp send successfully") {
          setShowOtpSection(true);
          setUserId(data.userId);
          setIsError(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setIsError(true);
        setMessage("Oops! Something went wrong. Please try again later.");
        console.log(err);
      });
  };

  return (
    <Fragment>
      {!showOtpSection && (
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

            <h3 className={styles["login"]}>Sign Up</h3>

            <form
              method="post"
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <div className={styles["input-section"]}>
                <div
                  className={`${styles["email"]} ${
                    nameError ? styles["invalid"] : ""
                  }`}
                >
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    name="name"
                    value={inputData.name}
                    onChange={inputDataHandler}
                  ></input>
                </div>
                <div
                  className={`${styles["email"]} ${
                    emailError ? styles["invalid"] : ""
                  }`}
                >
                  <label htmlFor="">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@example.com"
                    name="email"
                    value={inputData.email}
                    onChange={inputDataHandler}
                  ></input>
                </div>
                <div
                  className={`${styles["password"]} ${
                    passError ? styles["invalid"] : ""
                  }`}
                >
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={inputData.password}
                    placeholder="Enter 6 character or more "
                    onChange={inputDataHandler}
                  ></input>
                </div>
                <div
                  className={`${styles["password"]} ${
                    conPassError ? styles["invalid"] : ""
                  }`}
                >
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="text"
                    name="confirmPassword"
                    value={inputData.confirmPassword}
                    placeholder="Enter 6 character or more "
                    onChange={inputDataHandler}
                  ></input>
                </div>
              </div>
              {isLoader ? (
                <button className={styles["btn"]} type="button" disabled>
                  <LoaderForAuth />
                </button>
              ) : (
                <button className={styles["btn"]} type="submit">
                  Singn Up
                </button>
              )}
            </form>
            {isError && <p className={styles["message"]}>{message}</p>}
          </div>
          <div className={styles["design"]}></div>
        </div>
      )}
      {showOtpSection && (
        <Otpverify userId={userId} showOtpSection={otpSectionHandler} />
      )}
    </Fragment>
  );
};

export default Signup;
