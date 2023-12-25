import styles from "./Profilesection.module.css";

const Editpost = (props) => {
  console.log(props.postId);

  const backClickHandler = () => {
    props.backBtn(false);
  };

  return (
    <div className={styles["profile-main"]}>
      <img
        className={styles["back-btn"]}
        width="40"
        height="40"
        src="https://img.icons8.com/cotton/64/circled-left-2.png"
        alt="circled-left-2"
        onClick={backClickHandler}
      />
      <h3>Edit Blog</h3>
      <form action="" method="post">
        <div className={styles["profile-sub"]}>
          <div className={styles["section"]}>
            <label htmlFor="">Title</label>
            <input type="text" placeholder="Blog Title"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Short Description</label>
            <input type="text"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Content</label>
            <textarea></textarea>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Category</label>
            <select>
              <option value="1">Technology</option>
              <option value="1">Lifestyle</option>
            </select>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Image</label>
            <div className={styles["image"]}>
              <input type="file"></input>
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/pastel-glyph/64/image--v2.png"
                alt="file"
              />
            </div>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Image source</label>
            <input type="text"></input>
          </div>
          <div className={styles["section"]}>
            <label htmlFor="">Tag</label>
            <input type="text"></input>
          </div>
        </div>
        <div className={styles["button"]}>
          <button type="submit">Update Blog</button>
        </div>
      </form>
    </div>
  );
};

export default Editpost;
