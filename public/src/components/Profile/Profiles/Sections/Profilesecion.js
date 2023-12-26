import styles from "./Profilesection.module.css";

const ProfileSection = (props) => {
  return (
    <div className={styles["profile-main"]}>
      <h3>Profile</h3>
      <form action="" method="post">
        <div className={styles["profile-sub"]}>
          <div className={styles["section"]}>
            <label htmlFor="">Name</label>
            <input type="text" placeholder={props.userData.name}></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Email</label>
            <input type="email" placeholder={props.userData.email}></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Location</label>
            <input type="text" placeholder={props.userData.location}></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Website</label>
            <input type="text" placeholder={props.userData.website}></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Bio</label>
            <input type="text" placeholder={props.userData.bio}></input>
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
