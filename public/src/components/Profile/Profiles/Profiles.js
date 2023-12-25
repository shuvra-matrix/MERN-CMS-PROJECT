import styles from "./Profiles.module.css";
import ProfileSection from "./Sections/Profilesecion";
import SecuritySection from "./Sections/Securitysection";
import WritePostSection from "./Sections/WritepostSection";

const Profiles = (propes) => {
  return (
    <div className={styles["profiles"]}>
      {propes.options === "profile" ? <ProfileSection /> : ""}
      {propes.options === "security" ? <SecuritySection /> : ""}
      {propes.options === "writepost" ? <WritePostSection /> : ""}
    </div>
  );
};

export default Profiles;
