import styles from "./Profiles.module.css";
import Allpost from "./Sections/Allposts";
import ProfileSection from "./Sections/Profilesecion";
import SecuritySection from "./Sections/Securitysection";
import WritePostSection from "./Sections/WritepostSection";

const Profiles = (propes) => {
  return (
    <div className={styles["profiles"]}>
      {propes.options === "profile" ? <ProfileSection /> : ""}
      {propes.options === "security" ? <SecuritySection /> : ""}
      {propes.options === "writepost" ? (
        <WritePostSection postCategory={propes.postCategory} />
      ) : (
        ""
      )}
      {propes.options === "allpost" ? (
        <Allpost postCategory={propes.postCategory} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Profiles;
