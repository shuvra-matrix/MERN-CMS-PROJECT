import styles from "./Profile.module.css";
import Sidemenu from "./SideMenu/Sidemenu";
import Profiles from "./Profiles/Profiles";
import { useState } from "react";

const Profile = (props) => {
  const [option, setOption] = useState("profile");

  const optionHandler = (value) => {
    setOption(value);
  };

  return (
    <div className={styles["profile-main"]}>
      <Sidemenu optionHandel={optionHandler} />
      <Profiles options={option} postCategory={props.postCategory} />
    </div>
  );
};

export default Profile;
