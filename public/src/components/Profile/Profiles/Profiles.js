import styles from "./Profiles.module.css";
import Allpost from "./Sections/Allposts";
import ProfileSection from "./Sections/Profilesecion";
import SecuritySection from "./Sections/Securitysection";
import WritePostSection from "./Sections/WritepostSection";

const Profiles = (propes) => {
  return (
    <div className={styles["profiles"]}>
      {propes.options === "profile" ? (
        <ProfileSection userData={propes.userData} />
      ) : (
        ""
      )}
      {propes.options === "security" ? <SecuritySection /> : ""}
      {propes.options === "writepost" ? <WritePostSection /> : ""}
      {propes.options === "allpost" ? <Allpost /> : ""}
    </div>
  );
};

export default Profiles;
