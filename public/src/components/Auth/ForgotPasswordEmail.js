import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import LoaderForAuth from "../Loader/LoaderForAuth";
import { Link } from "react-router-dom";
import blogLogo from "../../media/bloglogo.png";

const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const ForgotPassEmail = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [isUserInputError, setIsUserInputError] = useState(false);

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const userInputHndler = (e) => {
    setUserInput(e.target.value);
    setIsUserInputError(false);
    setIsError(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!userInput.includes("@") && userInput.length < 8) {
      setIsUserInputError(true);
      return;
    }

    setIsLoader(true);
    const url = apiUrl + "/auth/sendresetlink";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: userInput }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 403) {
          throw new Error("Incorrect email");
        }

        return response.json();
      })
      .then((data) => {
        setIsLoader(false);
        navigate("/login", {
          state: {
            message: "Check your inbox or spam for a password reset link",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoader(false);
        setIsError(true);
        setMessage("Incorrect email.");
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

        <h3 className={styles["login"]}>Forgot Password</h3>

        <p className={styles["veri-message"]}>
          We will sent an reset link to your email address. Please check your
          <span> inbox</span> for the code. If you don't find it there, kindly
          take a peek in your
          <span> spam box </span>.
        </p>

        <form onSubmit={onSubmit}>
          <div
            className={`${styles["password"]} ${
              isUserInputError ? styles["invalid"] : ""
            }`}
          >
            <div className={styles["email"]}>
              <label htmlFor="">Email</label>
              <input
                onChange={userInputHndler}
                type="email"
                placeholder="your@example.com"
              ></input>
            </div>
          </div>
          {isLoader ? (
            <button className={styles["btn"]} type="button" disabled>
              <LoaderForAuth />
            </button>
          ) : (
            <button className={styles["btn"]} type="submit">
              Send Reset Link
            </button>
          )}
        </form>
        {isError && <p className={styles["message"]}>{message}</p>}
      </div>
      <div className={styles["design"]}></div>
    </div>
  );
};

export default ForgotPassEmail;
