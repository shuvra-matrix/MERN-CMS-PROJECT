import { Fragment, useEffect, useState } from "react";
import styles from "./Profilesection.module.css";
import { useNavigate } from "react-router-dom";

const ProfileSection = (props) => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    location: "",
    website: "",
    bio: "",
    otp: "",
  });

  const [isNewEmail, setNewEmail] = useState(false);
  const [isOtpSend, setOtpSend] = useState(false);

  const emailValidHandler = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return isValid;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputData((pre) => {
      return { ...pre, [name]: value.trim() };
    });
    setNewEmail(false);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      const isEmailValid = emailValidHandler(inputData.email.trim());
      console.log(isEmailValid);
      if (
        props.userData.email !== inputData.email &&
        inputData.email.length > 1 &&
        isEmailValid
      ) {
        setNewEmail(true);
      } else {
        setNewEmail(false);
      }
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [inputData.email, props.userData.email]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = inputData.name || props.userData.name;
    const email = inputData.email || props.userData.email;
    const website = inputData.website || props.userData.website;
    const bio = inputData.bio || props.userData.bio;
    const location = inputData.location || props.userData.location;
    const otp = inputData.otp || "";
    const isOtp = isOtpSend;

    const url = "http://localhost:3030/profile/editprofile";
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
          const err = new Error("server error");
          throw err;
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNewEmail(false);
        setOtpSend(false);
        if ((data.message = "profile update")) {
          props.userDataHndler(data.userData);
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const otpHandler = () => {
    const url = "http://localhost:3030/profile/genotp";
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
        if (data.message === "otp send") {
          setOtpSend(true);
          setNewEmail(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles["profile-main"]}>
      <h3>Profile</h3>
      <form action="" method="post" onSubmit={onSubmitHandler}>
        <div className={styles["profile-sub"]}>
          <div className={styles["section"]}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              placeholder={props.userData.name}
              onChange={inputHandler}
              value={inputData.name}
            ></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Email</label>
            <input
              onChange={inputHandler}
              type="email"
              name="email"
              placeholder={props.userData.email}
              value={inputData.email}
            ></input>
          </div>
          {isNewEmail && (
            <div className={styles["button"]}>
              <button onClick={otpHandler} type="submit">
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
                placeholder="Please Enter your otp"
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
                  placeholder={props.userData.location}
                  value={inputData.location}
                ></input>
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Website</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  name="website"
                  placeholder={props.userData.website}
                  value={inputData.website}
                ></input>
              </div>
              <div className={styles["section"]}>
                <label htmlFor="">Bio</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  name="bio"
                  placeholder={props.userData.bio}
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
    </div>
  );
};

export default ProfileSection;
