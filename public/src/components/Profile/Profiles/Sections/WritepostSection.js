import styles from "./Profilesection.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const WritePostSection = () => {
  return (
    <div className={styles["profile-main"]}>
      <h3>Write New Blog</h3>
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
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event) => {
                console.log(event);
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
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
          <button type="submit">Update Password</button>
        </div>
      </form>
    </div>
  );
};

export default WritePostSection;
