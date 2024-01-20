import styles from "./Profiles.module.css";
import Allpost from "./Sections/Allposts";
import ProfileSection from "./Sections/Profilesecion";
import SecuritySection from "./Sections/Securitysection";
import WritePostSection from "./Sections/WritepostSection";

const Profiles = (propes) => {
  return (
    <div className={styles["profiles"]}>
      {propes.options === "profile" ? (
        <ProfileSection logout={propes.logout} />
      ) : (
        ""
      )}
      {propes.options === "security" ? (
        <SecuritySection logout={propes.logout} />
      ) : (
        ""
      )}
      {propes.options === "writepost" ? (
        <WritePostSection
          postCategory={propes.postCategory}
          logout={propes.logout}
        />
      ) : (
        ""
      )}
      {propes.options === "allpost" ? (
        <Allpost
          postCategory={propes.postCategory}
          logout={propes.logout}
          option={propes.options}
          postStatus={propes.postStatus}
        />
      ) : (
        ""
      )}
      {propes.options === "recyclebin" ? (
        <Allpost
          postCategory={propes.postCategory}
          logout={propes.logout}
          option={propes.options}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Profiles;
