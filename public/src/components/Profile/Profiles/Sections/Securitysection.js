import { useState } from "react";
import styles from "./Profilesection.module.css";
import Message from "../../../Message/Message";
import LoaderSmall from "../../../Loader/LoaderSmall";

const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const SecuritySection = () => {
  const [userInput, setUserInput] = useState({
    oldpass: "",
    newpass: "",
    conpass: "",
  });
  const [oldPassError, setOldPassError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [conPassError, setConPassError] = useState(false);
  const [isMessage, setIsMesssage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSmallLaoder, setSmallLoader] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUserInput((pre) => {
      return { ...pre, [name]: value };
    });

    if (name === "oldpass") {
      setOldPassError(false);
    }
    if (name === "newpass") {
      setPassError(false);
    }
    if (name === "conpass") {
      setConPassError(false);
    }
  };

  const crossHandler = (value) => {
    setIsMesssage(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userInput);

    if (userInput.oldpass.trim().length < 6) {
      setOldPassError(true);
      return;
    }
    if (userInput.newpass.trim().length < 6) {
      setPassError(true);
      return;
    }
    if (userInput.conpass.trim().length < 6) {
      setConPassError(true);
      return;
    }
    if (userInput.conpass.trim() !== userInput.newpass.trim()) {
      setIsMesssage(true);
      setMessageType("error");
      setMessage("Confirmation password don't match.");
      setConPassError(true);
      return;
    }

    setSmallLoader(true);
    const token = localStorage.getItem("token");
    const url = apiUrl + "/profile/updatepassword";
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldpass: userInput.oldpass,
        newpass: userInput.newpass,
        conpass: userInput.conpass,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("invalid password");
        }

        return response.json();
      })
      .then((data) => {
        setIsMesssage(true);
        setMessage("Update Success!");
        setMessageType("message");
        setSmallLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setIsMesssage(true);
        setMessage("Password not valid");
        setMessageType("error");
        setSmallLoader(false);
      });
    setUserInput({
      oldpass: "",
      newpass: "",
      conpass: "",
    });
  };

  return (
    <div className={styles["profile-main"]}>
      {isMessage && (
        <Message type={messageType} message={message} cross={crossHandler} />
      )}
      {isSmallLaoder && (
        <div className={styles["small-loader"]}>
          <LoaderSmall />
        </div>
      )}
      <h3>Change Password</h3>
      <form onSubmit={submitHandler}>
        <div className={styles["profile-sub"]}>
          <div
            className={`${styles["section"]} ${
              oldPassError ? styles["invalid"] : ""
            }`}
          >
            <label htmlFor="">Previous Password</label>
            <input
              onChange={inputHandler}
              name="oldpass"
              type="password"
              autoComplete="new-password"
              value={userInput.oldpass}
            ></input>
          </div>
          <div
            className={`${styles["section"]} ${
              passError ? styles["invalid"] : ""
            }`}
          >
            <label htmlFor="">New Password</label>
            <input
              onChange={inputHandler}
              name="newpass"
              type="password"
              autoComplete="new-password"
              value={userInput.newpass}
            ></input>
          </div>
          <div
            className={`${styles["section"]} ${
              conPassError ? styles["invalid"] : ""
            }`}
          >
            <label htmlFor="">Confirm Password</label>
            <input
              onChange={inputHandler}
              name="conpass"
              type="text"
              value={userInput.conpass}
            ></input>
          </div>
        </div>
        <div className={styles["button"]}>
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySection;
