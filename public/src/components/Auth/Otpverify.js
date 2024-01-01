import { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import LoaderForAuth from "../Loader/LoaderForAuth";

const Otpverify = (props) => {
  const [getOtp, setOtp] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setOtp(e.target.value);
    setIsError(false);
  };
  const [isError, setIsError] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const onSubmitHandler = () => {
    const otp = getOtp;
    const userId = props.userId;

    setIsLoader(true);
    const url = "http://localhost:3030/auth/otpverify";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        otp: otp,
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 500) {
          throw Error("something went wrong");
        }

        return response.json();
      })
      .then((data) => {
        setIsLoader(false);
        if (data.message === "notverified") {
          setIsError(true);
          setMessage("Invalid OTP");
        }
        if (data.message === "verified") {
          props.showOtpSection(false);
          navigate("/login", {
            state: { message: "Verification successful! Please log in." },
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);
        console.log(err);
        setIsError(true);
        setMessage("Oops! Something went wrong. Please try again later.");
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

        <h3 className={styles["login"]}>Verification</h3>

        <form method="post" onSubmit={onSubmitHandler}>
          <div className={styles["input-section"]}>
            <div className={styles["email"]}>
              <label htmlFor="">You will get a OTP via EMAIL</label>
              <input
                onChange={inputHandler}
                type="email"
                placeholder="Enter your OTP "
              ></input>
            </div>
          </div>
          {isLoader ? (
            <button className={styles["btn"]} type="button" disabled>
              <LoaderForAuth />
            </button>
          ) : (
            <button
              onClick={onSubmitHandler}
              className={styles["btn"]}
              type="submit"
            >
              Verify
            </button>
          )}
        </form>
        {isError && <p className={styles["message"]}>{message}</p>}
      </div>
      <div className={styles["design"]}></div>
    </div>
  );
};

export default Otpverify;
