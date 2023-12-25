import { useState } from "react";
import styles from "./Forgotpassword.module.css";
import { useNavigate } from "react-router-dom";

const Otpverify = (props) => {
  const [getOtp, setOtp] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setOtp(e.target.value);
  };

  const onSubmitHandler = (e) => {
    const otp = getOtp;
    const userId = props.userId;
    console.log(otp, userId);

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
        return response.json();
      })
      .then((data) => {
        if (data.message === "verified") {
          props.showOtpSection(false);
          navigate("/login", { state: { message: "Verification done" } });
        }
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
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

        <h3 className={styles["login"]}>Verify OTP</h3>

        <form method="post" onSubmit={onSubmitHandler}>
          <div className={styles["input-section"]}>
            <div className={styles["email"]}>
              <label htmlFor="">OTP</label>
              <input
                onChange={inputHandler}
                type="email"
                placeholder="Enter your otp "
              ></input>
            </div>
          </div>
          <button
            onClick={onSubmitHandler}
            className={styles["btn"]}
            type="submit"
          >
            Verify
          </button>
        </form>
      </div>
      <div className={styles["design"]}></div>
    </div>
  );
};

export default Otpverify;
