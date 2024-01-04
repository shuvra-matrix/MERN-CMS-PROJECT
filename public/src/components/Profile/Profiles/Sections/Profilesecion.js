import { Fragment, useEffect, useState } from "react";
import styles from "./Profilesection.module.css";
import { useNavigate } from "react-router-dom";
import LoaderBig from "../../../Loader/LoaderBig";
import LoaderSmall from "../../../Loader/LoaderSmall";
import Message from "../../../Message/Message";

const apiUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";

const ProfileSection = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoader, setLoader] = useState(false);
  const [isSmallLaoder, setSmallLoader] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    location: "",
    website: "",
    bio: "",
    otp: "",
  });

  const [isEmailValid, setEmailValid] = useState(true);
  const [isNewEmail, setNewEmail] = useState(false);
  const [isOtpSend, setOtpSend] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessage, setIsMesssage] = useState(false);
  const [messageType, setMessageType] = useState("");

  const crossHandler = (value) => {
    setIsMesssage(value);
  };

  const emailValidHandler = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return isValid;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputData((pre) => {
      return { ...pre, [name]: value };
    });
    setNewEmail(false);
    setEmailValid(true);
  };

  useEffect(() => {
    const url = apiUrl + "/profile/profile";
    const token = localStorage.getItem("token");
    setLoader(true);
    fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (!response.ok) {
          const error = new Error("invalid user");
          throw error;
        }

        return response.json();
      })
      .then((data) => {
        setUserData(data.userData);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setIsMesssage(true);
        setMessageType("error");
        setMessage("Server Error!");
      });
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      const isEmailValid = emailValidHandler(inputData.email.trim());
      if (
        userData.email !== inputData.email &&
        inputData.email.length > 1 &&
        isEmailValid &&
        !isOtpSend
      ) {
        setNewEmail(true);
      } else {
        setNewEmail(false);
      }
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [inputData.email, userData.email, isOtpSend]);

  const otpHandler = () => {
    const emailValid = emailValidHandler(inputData.email);
    setSmallLoader(true);
    if (!emailValid) {
      setEmailValid(false);
      return;
    }

    const url = apiUrl + "/profile/genotp";
    const token = localStorage.getItem("token");
    const email = inputData.email;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          const err = new Error("autherror");
          throw err;
        }
        return response.json();
      })
      .then((data) => {
        setSmallLoader(false);
        if (data.message === "otp send") {
          setOtpSend(true);
          setNewEmail(false);
          setIsMesssage(true);
          setMessageType("message");
          setMessage("OTP Send");
        }
      })
      .catch((err) => {
        setSmallLoader(false);
        console.log(err);
        setOtpSend(false);
        setNewEmail(false);
        setIsMesssage(true);
        setMessageType("error");
        setMessage("OTP Send Failed.");
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSmallLoader(true);
    const name = inputData.name || userData.name;
    const email = inputData.email || userData.email;
    const website = inputData.website || userData.website;
    const bio = inputData.bio || userData.bio;
    const location = inputData.location || userData.location;
    const otp = inputData.otp || "";
    const isOtp = isOtpSend;

    const url = apiUrl + "/profile/editprofile";
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email,
        website: website,
        bio: bio,
        location: location,
        otp: otp,
        isOtp: isOtp,
      }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setInputData({
          name: "",
          email: "",
          location: "",
          website: "",
          bio: "",
          otp: "",
        });

        if (!response.ok) {
          setIsMesssage(true);
          setMessageType("error");

          if (response.status === 401) {
            setMessage("Invalid OTP!");
          } else {
            setMessage("Upload Failed!");
          }

          const err = new Error("server error");
          throw err;
        }

        return response.json();
      })
      .then((data) => {
        setSmallLoader(false);
        setNewEmail(false);
        setOtpSend(false);
        if ((data.message = "profile update")) {
          setIsMesssage(true);
          setMessageType("message");
          setMessage("Upload Success!");
          setUserData(data.userData);
          navigate("/profile");
        }
      })
      .catch((err) => {
        setSmallLoader(false);
        setNewEmail(false);
        setOtpSend(false);
        setIsMesssage(true);
        setMessageType("error");
        setMessage("Upload Failed!");
        console.log(err);
      });
  };

  return (
    <div className={styles["profile-main"]}>
      <h3>Profile</h3>
      {isSmallLaoder && (
        <div className={styles["small-loader"]}>
          <LoaderSmall />
        </div>
      )}

      {isLoader && (
        <div className={styles["loader"]}>
          <LoaderBig />
        </div>
      )}
      {isMessage && (
        <Message type={messageType} message={message} cross={crossHandler} />
      )}
      {!isLoader && (
        <form action="" method="post" onSubmit={onSubmitHandler}>
          <div className={styles["profile-sub"]}>
            <div className={styles["section"]}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                placeholder={userData.name}
                onChange={inputHandler}
                value={inputData.name}
              ></input>
            </div>
            <div
              className={`${styles["section"]} ${
                !isEmailValid ? styles["invalid"] : ""
              }`}
            >
              <label htmlFor="">Email</label>
              {isOtpSend ? (
                <input
                  onChange={inputHandler}
                  type="text"
                  name="email"
                  placeholder={userData.email}
                  value={inputData.email}
                  readOnly
                ></input>
              ) : (
                <input
                  onChange={inputHandler}
                  type="text"
                  name="email"
                  placeholder={userData.email}
                  value={inputData.email}
                ></input>
              )}
            </div>
            {isNewEmail && (
              <div className={styles["button"]}>
                <button onClick={otpHandler} type="button">
                  Send OTP
                </button>
              </div>
            )}
            {isOtpSend && (
              <div className={styles["section"]}>
                <label htmlFor="">OTP</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  name="otp"
                  placeholder="Please Enter Your OTP"
                ></input>
              </div>
            )}
            {!isNewEmail && (
              <Fragment>
                <div className={styles["section"]}>
                  <label htmlFor="">Location</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    name="location"
                    placeholder={userData.location}
                    value={inputData.location}
                  ></input>
                </div>
                <div className={styles["section"]}>
                  <label htmlFor="">Website</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    name="website"
                    placeholder={userData.website}
                    value={inputData.website}
                  ></input>
                </div>
                <div className={styles["section"]}>
                  <label htmlFor="">Bio</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    name="bio"
                    placeholder={userData.bio}
                    value={inputData.bio}
                  ></input>
                </div>{" "}
              </Fragment>
            )}
          </div>
          {!isNewEmail && (
            <div className={styles["button"]}>
              <button type="submit">Update info</button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ProfileSection;
