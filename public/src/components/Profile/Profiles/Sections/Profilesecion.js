import styles from "./Profilesection.module.css";

const ProfileSection = () => {
  return (
    <div className={styles["profile-main"]}>
      <h3>Profile</h3>
      <form action="" method="post">
        <div className={styles["profile-sub"]}>
          <div className={styles["section"]}>
            <label htmlFor="">Name</label>
            <input type="text"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Email</label>
            <input type="email"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Location</label>
            <input type="text"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Website</label>
            <input type="text"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Bio</label>
            <input type="text"></input>
          </div>
        </div>
        <div className={styles["button"]}>
          <button type="submit">Update info</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;
