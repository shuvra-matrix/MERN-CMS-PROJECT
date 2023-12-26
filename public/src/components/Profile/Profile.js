import styles from "./Profile.module.css";
import Sidemenu from "./SideMenu/Sidemenu";
import Profiles from "./Profiles/Profiles";
import { useEffect, useState } from "react";

const Profile = () => {
  const [option, setOption] = useState("profile");
  const [userData, setUserData] = useState({});

  const optionHandler = (value) => {
    setOption(value);
  };

  useEffect(() => {
    const url = "http://localhost:3030/profile/profile";
    const token = localStorage.getItem("token");

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData);

  return (
    <div className={styles["profile-main"]}>
      <Sidemenu optionHandel={optionHandler} />
      <Profiles options={option} userData={userData} />
    </div>
  );
};

export default Profile;
