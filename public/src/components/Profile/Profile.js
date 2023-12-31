import styles from "./Profile.module.css";
import Sidemenu from "./SideMenu/Sidemenu";
import Profiles from "./Profiles/Profiles";
import { Fragment, useState } from "react";

const Profile = (props) => {
  const optionValue = localStorage.getItem("optionValue") || "profile";
  const [option, setOption] = useState(optionValue);

  const optionHandler = (value) => {
    setOption(value);
  };

  return (
    <Fragment>
      <div className={styles["main-div"]}>
        <div className={styles["round-one"]}></div>
        <div className={styles["round-two"]}></div>
        <div className={styles["title"]}>
          <p>Profile</p>
          <div className={styles["strip-one"]}></div>
          <div className={styles["strip-two"]}></div>
          <div className={styles["strip-three"]}></div>
        </div>
      </div>
      <div className={styles["profile-main"]}>
        <Sidemenu optionHandel={optionHandler} />
        <Profiles options={option} postCategory={props.postCategory} />
      </div>
    </Fragment>
  );
};

export default Profile;
