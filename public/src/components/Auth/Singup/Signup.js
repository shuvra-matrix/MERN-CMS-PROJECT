import styles from "./Signup.module.css";
import { Fragment, useState } from "react";
import Otpverify from "../FogotPassword/Otpverify";

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

  const otpSectionHandler = (value) => {
    setShowOtpSection(value);
    props.authRoutes("login");
  };

  const inputDataHandler = (e) => {
    console.log(e);
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

    const url = "http://localhost:3030/auth/signup";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Can not signup");
        }
        return response.json();
      })
      .then((data) => {
        const message = data.message;
        if (message === "otp send successfully") {
          setShowOtpSection(true);
          setUserId(data.userId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {!showOtpSection && (
        <div className={styles["login-main"]}>
          <div className={styles["login-sub"]}>
            <div className={styles["title"]}>
              <h3>
                Blog<span>Sp</span>ot
              </h3>
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
              <button className={styles["btn"]} type="submit">
                Sign Up
              </button>
            </form>
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
